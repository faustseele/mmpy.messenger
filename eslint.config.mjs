import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  /* Array of configuration objects,
    prioritizes the last one */
  /* Single configuration object */
  eslint.configs.recommended,

  /* Needs spread to unpack,
    bc it's an array of configuration objects */
  ...tseslint.configs.recommended,

  /* Custom configuration */
  {
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      /* Adds support for global variables */
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "eol-last": ["warn", "always"],
      "no-unused-vars": ["warn"],
      "@typescript-eslint/no-unused-vars": ["warn"],
      /* Enforce extensions for TypeScript files */
      "import/extensions": [
        "error",
        "always",
        {
          /* Require .ts for TypeScript files */
          ts: "always",
          /* Require .d.ts for declaration files */
          dts: "always",
        },
      ],
    },
  },
);
