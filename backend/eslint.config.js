import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended", prettier],
        rules: {
            "no-unused-vars": ["error", { varsIgnorePattern: "^express$" }],
            "no-undef": "error",
            semi: ["error", "always"],
            eqeqeq: ["warn", "always"]
        }
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: { globals: globals.node }
    }
]);
