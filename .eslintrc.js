module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        project: "tsconfig.json",
    },
    ignorePatterns: [".eslintrc.js", "vite.config.mts", "scripts/*", "src/assets/locales/*"],
    plugins: ["@typescript-eslint/eslint-plugin", "simple-import-sort", "react-hooks"],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
    ],
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "arrow-parens": ["error", "always"],
        curly: ["error", "multi-line"],
        "import/no-cycle": "off",
        "no-extend-native": "error",
        "no-unused-vars": "off",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "interface",
                format: ["PascalCase"],
                prefix: ["I"],
            },
            {
                selector: "enum",
                format: ["PascalCase"],
                prefix: ["CE_", "E_"],
            },
            {
                selector: ["function", "classMethod"],
                modifiers: ["async"],
                format: ["camelCase", "PascalCase"],
                suffix: ["Async"],
            },
        ],
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-duplicate-enum-values": "error",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                vars: "local",
                args: "after-used",
            },
        ],
        "@typescript-eslint/prefer-as-const": "error",
    },
};
