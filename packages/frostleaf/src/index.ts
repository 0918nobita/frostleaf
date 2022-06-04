import arg from "arg";

import { build } from "./build";
import { processFlags } from "./process-flags";

export const main = async (): Promise<void> => {
    const validArgs = arg(
        {
            "--help": Boolean,
            "--version": Boolean,
        },
        { argv: process.argv }
    );

    processFlags(validArgs);

    await build(validArgs);
};
