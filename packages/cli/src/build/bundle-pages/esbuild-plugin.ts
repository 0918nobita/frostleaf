import * as babel from "@babel/core";
import esbuild from "esbuild";
import fs from "fs/promises";

// https://github.com/evanw/esbuild/issues/334#issuecomment-760427837
export const esbuildPluginReactJsx: esbuild.Plugin = {
    name: "react-jsx",

    setup: (build) => {
        build.onLoad({ filter: /.tsx$/ }, async (args) => {
            const tsx = await fs.readFile(args.path, "utf8");
            const result = babel.transformSync(tsx, {
                plugins: [
                    ["@babel/plugin-transform-typescript", { isTSX: true }],
                    [
                        "@babel/plugin-transform-react-jsx",
                        {
                            runtime: "automatic",
                            importSource: "@frostleaf",
                        },
                    ],
                ],
            });
            return { contents: result?.code || undefined };
        });
    },
};
