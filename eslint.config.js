import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{js,jsx}'],
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            react.configs.flat.recommended, // 2. 启用 React 推荐规则，包含 jsx-no-undef
            react.configs.flat['jsx-runtime'], // 3. 兼容 React 17+ 的新 JSX 转换
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        rules: {
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
            ...reactRefresh.configs.vite.rules,
        },
        settings: {
            react: { version: 'detect' }, // 告诉 ESLint 自动检测 React 版本
        },
    },
]);