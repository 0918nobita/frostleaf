import arg from "arg";
import chalk from "chalk";
import type { Stats } from "fs";
import fs from "fs/promises";
import path from "path";
import * as swc from "@swc/core";

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
    destDir: string,
    componentPaths: string[]
) => {
    try {
        const destComponentsDir = path.join(destDir, "components");
        await fs.mkdir(destComponentsDir, { recursive: true });

        for (const componentPath of componentPaths) {
            console.log(`Compiling ${componentPath} ...`);
            const mod = await swc.parseFile(componentPath, {
                syntax: "typescript",
            });
            const output = await swc.transform(mod);
            const outFilePath = path.join(
                destComponentsDir,
                `${path.parse(componentPath).name}.js`
            );
            await fs.writeFile(outFilePath, output.code);
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

    const frostleafDir = path.join(projectRoot, "_frostleaf");
    await fs.mkdir(frostleafDir, { recursive: true });

    await compileComponentDefs(frostleafDir, componentPaths);
};

main();
