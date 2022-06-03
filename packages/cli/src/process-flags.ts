import arg from "arg";
import chalk from "chalk";

import { printAndExit } from "./print-and-exit";

export const processFlags = <T extends arg.Spec>(args: arg.Result<T>): void => {
    if (args["--help"]) printAndExit(chalk.bold.magenta("Frostleaf CLI"), 0);

    if (args["--version"]) printAndExit("0.1.0", 0);
};
