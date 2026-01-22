import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "eqeqeq": "error",
    },
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
]);
