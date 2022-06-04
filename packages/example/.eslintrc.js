const baseConfig = require("@frostleaf/eslint-config")({
    tsconfigRootDir: __dirname,
});

module.exports = {
    ...baseConfig,
    ignorePatterns: [...baseConfig.ignorePatterns, "_frostleaf"],
};
