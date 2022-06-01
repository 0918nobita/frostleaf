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

const getComponentPaths = async (projectPath: string): Promise<string[]> => {
    const componentsDir = path.join(projectPath, "components");
    let stat: Stats;
    try {
        stat = await fs.stat(componentsDir);
    } catch (e) {
        return [];
    }
    if (!stat.isDirectory())
        throw new Error(`components directory must be folder`);
    try {
        return (await fs.readdir(componentsDir)).map((p) =>
            path.join(componentsDir, p)
        );
    } catch (e) {
        throw new Error("Failed to read components directory");
    }
};

const parseComponentDefs = async (componentPaths: string[]) => {
    try {
        for (const componentPath of componentPaths) {
            console.log(`[${componentPath}]`);
            const mod = await swc.parseFile(componentPath, {
                syntax: "typescript",
            });
            const ast = mod.body;
            console.log(ast);
        }
    } catch (e: unknown) {
        printAndExit(String(e));
    }
};

export const main = async () => {
    if (args["--help"]) printAndExit(chalk.bold.magenta("Frostleaf CLI"), 0);
    if (args["--version"]) printAndExit("0.1.0", 0);
    const projectPath =
        args._.length >= 3 ? path.resolve(args._[1]) : process.cwd();
    const componentPaths = await getComponentPaths(projectPath);
    await parseComponentDefs(componentPaths);
};

main();
