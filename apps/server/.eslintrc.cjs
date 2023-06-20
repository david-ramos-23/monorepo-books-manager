module.exports = {
	root: true,
	extends: ['custom'],
	overrides: [
		{
			files: ['src/**/*.ts?(x)'],
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: __dirname,
			},
		},
	],
	rules: {
		'@typescript-eslint/no-empty-function': 'off',
	},
	ignorePatterns: ['.eslintrc.cjs'],
}
