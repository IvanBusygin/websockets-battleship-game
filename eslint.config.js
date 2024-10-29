// @ts-check

import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tsEslint.config(
  { files: ['**/*.{ts}'] },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.es2023 },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      '@typescript-eslint/no-unused-vars': 1,
      'prefer-const': 2,
    },
  },
  {
    ignores: ['node_modules', 'eslint.config.js', 'dist', 'front'],
  },
);
