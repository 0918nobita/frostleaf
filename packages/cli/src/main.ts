import arg from "arg";
import chalk from "chalk";

const args = arg(
    {
        "--help": Boolean,
        "--version": Boolean,
    },
    { argv: process.argv }
);

if (args["--help"]) {
    console.log(chalk.bold.magenta("Frostleaf CLI"));
    process.exit(0);
}

if (args["--version"]) {
    console.log("0.1.0");
    process.exit(0);
}
