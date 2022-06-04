import arg from "arg";

import { printAndExit } from "./print-and-exit";

export const processFlags = <T extends arg.Spec>(args: arg.Result<T>): void => {
    if (args["--help"]) printAndExit("Frostleaf CLI", 0);

    if (args["--version"]) printAndExit("0.1.0", 0);
};
