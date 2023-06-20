module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['plugin:react-hooks/recommended', 'custom'],
  plugins: ['react-refresh', 'testing-library'],
  overrides: [
    {
      files: ['src/**/*.ts?(x)'],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  ignorePatterns: ['.eslintrc.cjs'],
}
