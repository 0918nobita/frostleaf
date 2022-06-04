/**
 * @param {{ tsconfigRootDir: string }}
 * @returns {import("eslint").Linter.Config}
 */
module.exports = ({ tsconfigRootDir }) => ({
    root: true,
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    extends: ["eslint:recommended"],
    ignorePatterns: ["dist"],
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            extends: [
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
            ],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                tsconfigRootDir,
                project: "./tsconfig.json",
            },
        }
    ],
});
