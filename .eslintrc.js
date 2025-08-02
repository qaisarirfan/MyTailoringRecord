const path = require("path");

module.exports = {
  root: true,
  extends: [
    "@react-native",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["prettier", "import"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: path.resolve(__dirname),
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        // Add your Prettier formatting options here.
        // These will override any default Prettier config.
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        trailingComma: "es5",
        jsxBracketSameLine: false,
        bracketSpacing: true,
        arrowParens: "always",
        endOfLine: "lf",
        jsxSingleQuote: false,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // fs, path, etc.
          "external", // react, lodash
          "internal", // your aliases like @app/*
          ["parent", "sibling", "index"],
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "@app/**",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
  },
  overrides: [
    // 🛑 Prevent parsing errors on config files
    {
      files: [
        "*.js",
        "*.cjs",
        "*.mjs",
        "babel.config.js",
        "jest.config.js",
        "metro.config.js",
        ".eslintrc.js",
      ],
      parser: "espree", // Use the default JS parser
      parserOptions: {
        project: null, // Prevent using TS project for JS files
      },
    },

    // ✅ Enable JSX in .js/.jsx files
    {
      files: ["**/*.js", "**/*.jsx"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
      },
      rules: {
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
      },
    },
  ],
  settings: {
    // Tells eslint-plugin-react to automatically detect the React version.
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: path.resolve(__dirname, "./tsconfig.json"), // Point to your tsconfig.json
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Ensure all relevant extensions are resolved
      },
    },
  },
};
