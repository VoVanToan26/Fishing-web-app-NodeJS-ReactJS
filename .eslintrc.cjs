module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
        es6: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        indent: ["error", 4],
        "linebreak-style": 0,
        quotes: ["error", "double"],
        semi: ["error", "always", { omitLastInOneLineBlock: true }],
    },
    indent: ["error", 12],
};
