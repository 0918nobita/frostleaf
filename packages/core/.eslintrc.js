const baseConfig = require("@frostleaf/eslint-config");

/** @type {import("eslint").Linter.Config} */
module.exports = ({
    ...baseConfig,

    ignorePatterns: ["dist"],

    plugins: ["simple-import-sort"],

    rules: {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },

    overrides: [
        {
            files: ["*.ts"],
            extends: [
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
            ],
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: "./tsconfig.json",
            },
        },
    ],
});
