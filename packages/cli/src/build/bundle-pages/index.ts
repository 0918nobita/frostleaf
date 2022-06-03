import esbuild from "esbuild";

import { BundleJs, EntryPointTs } from "../path";
import { esbuildPluginReactJsx } from "./esbuild-plugin";

type Args = {
    bundleJs: BundleJs.BundleJs;
    entryPointTs: EntryPointTs.EntryPointTs;
};

export const bundlePages = async ({ bundleJs, entryPointTs }: Args) => {
    console.log("Bundling pages ...");
    await esbuild.build({
        entryPoints: [entryPointTs],
        bundle: true,
        outfile: bundleJs,
        format: "cjs",
        external: ["@frostleaf/core"],
        plugins: [esbuildPluginReactJsx],
    });
};
