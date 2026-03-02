import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default defineConfig([
  // 1. 기본 및 추천 설정들 (기존의 extends 역할을 합니다)
  js.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // 플러그인 권장 규칙 적용
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,

      // 커스텀 규칙
      'no-unused-vars': 'warn',
      eqeqeq: 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
    },
  },

  // 2. Prettier 설정 (다른 룰을 덮어쓰기 위해 항상 마지막에 위치)
  eslintConfigPrettier,
]);
