import arg from "arg";

import { build } from "./build";
import { processFlags } from "./process-flags";

const main = async (): Promise<void> => {
    const validArgs = arg(
        {
            "--help": Boolean,
            "--version": Boolean,
        },
        { argv: process.argv }
    );

    processFlags(validArgs);

    build(validArgs);
};

main();
