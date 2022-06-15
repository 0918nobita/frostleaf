const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const { build } = require("esbuild");

(async () => {
    try {
        console.log("Compiling Frostleaf.Core library ...");
        await exec("dotnet fable src/Frostleaf.Core");
    } catch (e) {
        console.error("Failed to compile Frostleaf.Core library");
        console.error(e);
        process.exit(1);
    }

    try {
        console.log("Compiling Frostleaf.Cli program ...");
        await exec("dotnet fable src/Frostleaf.Cli");
    } catch (e) {
        console.error("Failed to compile Frostleaf.Cli program");
        console.error(e);
        process.exit(1);
    }

    try {
        console.log("Bundling Frostleaf.Core library ...");
        await build({
            platform: "node",
            entryPoints: ["./src/Frostleaf.Core/entryPoint.js", "./src/Frostleaf.Cli/Program.fs.js"],
            outdir: "dist",
            bundle: true,
        });
    } catch (e) {
        console.error("Failed to bundle Frostleaf.Core library");
        console.error(e);
        process.exit(1);
    }
})();
