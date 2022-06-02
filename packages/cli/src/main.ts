import arg from "arg";
import chalk from "chalk";
import esbuild from "esbuild";
import type { Stats } from "fs";
import fs from "fs/promises";
import path from "path";

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

const getComponentPaths = async (componentsDir: string): Promise<string[]> => {
    let stat: Stats;
    try {
        stat = await fs.stat(componentsDir);
    } catch (e) {
        return [];
    }
    if (!stat.isDirectory())
        throw new Error(`components directory must be folder`);
    try {
        return (await fs.readdir(componentsDir))
            .map((p) => path.join(componentsDir, p))
            .filter((p) => p.endsWith(".ts"));
    } catch (e) {
        throw new Error("Failed to read components directory");
    }
};

const compileComponentDefs = async (
    destComponentsDir: string,
    componentPaths: string[]
): Promise<void> => {
    try {
        for (const componentPath of componentPaths) {
            console.log(`Compiling ${componentPath} ...`);
            const src = await fs.readFile(componentPath, { encoding: "utf8" });

            const result = await esbuild.transform(src, { loader: "ts" });
            for (const warning of result.warnings) console.warn(warning);

            const outFilePath = path.join(
                destComponentsDir,
                `_${path.parse(componentPath).name}.js`
            );
            await fs.writeFile(outFilePath, result.code);
        }
    } catch (e: unknown) {
        printAndExit(String(e));
    }
};

const main = async () => {
    if (args["--help"]) printAndExit(chalk.bold.magenta("Frostleaf CLI"), 0);

    if (args["--version"]) printAndExit("0.1.0", 0);

    const projectRoot =
        args._.length >= 3 ? path.resolve(args._[1]) : process.cwd();

    const componentsDir = path.join(projectRoot, "components");
    const componentPaths = await getComponentPaths(componentsDir);

    const destDir = path.join(projectRoot, "_frostleaf");
    await prepareCleanDir(destDir);

    const destComponentsDir = path.join(destDir, "components");
    await prepareCleanDir(destComponentsDir);

    await compileComponentDefs(destComponentsDir, componentPaths);
};

main();
