import { Element, render } from "@frostleaf/build-time";
import arg from "arg";
import chalk from "chalk";
import esbuild from "esbuild";
import type { Stats } from "fs";
import fs from "fs/promises";
import path from "path";

import type { ImportMap } from "./importMap";
import { prepareCleanDir } from "./prepareCleanDir";

const printAndExit = (msg: string, code = 1) => {
    console.error(msg);
    process.exit(code);
};

const args = arg(
    {
        "--help": Boolean,
        "--version": Boolean,
    },
    { argv: process.argv }
);

const getTsFilePaths = async (componentsDir: string): Promise<ImportMap> => {
    let stat: Stats;
    try {
        stat = await fs.stat(componentsDir);
    } catch (e) {
        return [];
    }
    if (!stat.isDirectory())
        throw new Error(`components directory must be folder`);
    try {
        const files = await fs.readdir(componentsDir);
        return files
            .filter((p) => p.endsWith(".ts"))
            .map((p) => [path.parse(p).name, path.join(componentsDir, p)]);
    } catch (e) {
        throw new Error("Failed to read components directory");
    }
};

const main = async (): Promise<void> => {
    if (args["--help"]) printAndExit(chalk.bold.magenta("Frostleaf CLI"), 0);

    if (args["--version"]) printAndExit("0.1.0", 0);

    const projectRoot =
        args._.length >= 3 ? path.resolve(args._[1]) : process.cwd();

    const pagesDir = path.join(projectRoot, "pages");
    const pageImportMap = await getTsFilePaths(pagesDir);

    const destDir = path.join(projectRoot, "_frostleaf");
    await prepareCleanDir(destDir);

    const entryPointTs = path.join(destDir, "entryPoint.ts");
    console.log(`Generating ${path.relative(projectRoot, entryPointTs)} ...`);
    const content = pageImportMap
        .map(([name, from]) => {
            const parsedPath = path.parse(path.relative(destDir, from));
            return `export * as ${name} from "${path.join(
                parsedPath.dir,
                parsedPath.name
            )}";\n`;
        })
        .join("");
    await fs.writeFile(entryPointTs, content);

    const bundleJs = path.join(destDir, "bundle.js");
    console.log("Bundling pages ...");
    await esbuild.build({
        entryPoints: [entryPointTs],
        bundle: true,
        outfile: bundleJs,
        format: "cjs",
        external: ["@frostleaf/build-time"],
    });

    const pages = require(bundleJs);

    const pageElements = await Promise.all(
        Object.entries(pages).flatMap(([pageName, content]: [string, any]) => {
            if ("default" in content) return [[pageName, content.default()]];
            return [];
        })
    );

    const renderResults = await Promise.all(
        pageElements.map(([pageName, element]) =>
            render(element as unknown as Element<any>).then((html) => [
                pageName,
                html,
            ])
        )
    );

    const outDir = path.join(destDir, "out");
    await prepareCleanDir(outDir);

    await Promise.all(
        renderResults.map(([pageName, html]) => {
            const pagePath = path.join(outDir, `${pageName}.html`);
            return fs.writeFile(
                pagePath,
                `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
${html}
</body>
</html>
`
            );
        })
    );
};

main();
