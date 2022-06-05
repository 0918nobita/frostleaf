/** @type {import("eslint").Linter.Config} */
module.exports = {
    ...require("@frostleaf/eslint-config"),

    ignorePatterns: ["_frostleaf"],

    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
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
};
