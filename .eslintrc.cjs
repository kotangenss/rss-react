module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}', 'vite.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'no-console': 0,
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'comma-dangle': ['error', 'only-multiline'],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'prettier/prettier': ['error', { trailingComma: 'es5' }],
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
