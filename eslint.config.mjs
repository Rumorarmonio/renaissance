import globals from 'globals'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import'

const vueRecommendedConfig = vuePlugin.configs['flat/vue2-recommended']
const vueRecommendedItems = Array.isArray(vueRecommendedConfig)
  ? vueRecommendedConfig
  : [vueRecommendedConfig]

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      'storybook-static',
      '.turbo',
      '.cache',
      '.idea',
      '.vscode',
    ],
  },

  ...vueRecommendedItems,

  {
    files: ['src/**/*.{ts,vue}', 'src/**/*.d.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,

      'prefer-const': 'warn',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      'import/no-unresolved': 'error',
      'vue/multi-word-component-names': 'off',

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
          vue: 'never',
        },
      ],
    },
  },

  {
    files: ['webpack.config.js', 'eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'import/no-unresolved': 'off',
    },
  },
]
