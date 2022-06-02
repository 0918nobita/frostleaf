import arg from "arg";
import chalk from "chalk";
import esbuild from "esbuild";
import type { Stats } from "fs";
import fs from "fs/promises";
import path from "path";

import { generateIndexJs } from "./generateIndexJs";
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

const getComponentPaths = async (componentsDir: string): Promise<ImportMap> => {
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

const compileComponentDefs = async (
    projectRoot: string,
    destComponentsDir: string,
    componentImportMap: ImportMap
): Promise<ImportMap> => {
    const destImportMap: ImportMap = [];
    for (const [componentName, componentPath] of componentImportMap) {
        const outFilePath = path.join(
            destComponentsDir,
            `_${componentName}.js`
        );

        console.log(
            `Compiling ${path.relative(
                projectRoot,
                componentPath
            )} to ${path.relative(projectRoot, outFilePath)} ...`
        );
        const src = await fs.readFile(componentPath, { encoding: "utf8" });

        const result = await esbuild.transform(src, {
            loader: "ts",
            format: "cjs",
        });
        for (const warning of result.warnings) console.warn(warning);

        destImportMap.push([componentName, outFilePath]);
        await fs.writeFile(outFilePath, result.code);
    }
    return destImportMap;
};

const main = async (): Promise<void> => {
    if (args["--help"]) printAndExit(chalk.bold.magenta("Frostleaf CLI"), 0);

    if (args["--version"]) printAndExit("0.1.0", 0);

    const projectRoot =
        args._.length >= 3 ? path.resolve(args._[1]) : process.cwd();

    const componentsDir = path.join(projectRoot, "components");
    const componentImportMap = await getComponentPaths(componentsDir);

    const destDir = path.join(projectRoot, "_frostleaf");
    await prepareCleanDir(destDir);

    const destComponentsDir = path.join(destDir, "components");
    await prepareCleanDir(destComponentsDir);

    const destImportMap = await compileComponentDefs(
        projectRoot,
        destComponentsDir,
        componentImportMap
    );

    const destComponentIndexJs = path.join(destComponentsDir, "index.js");
    console.log(
        `Generating ${path.relative(projectRoot, destComponentIndexJs)} ...`
    );
    await fs.writeFile(destComponentIndexJs, generateIndexJs(destImportMap));

    require(destComponentIndexJs);
};

main();
