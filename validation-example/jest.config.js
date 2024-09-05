/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
	preset: 'ts-jest',
	transform: {
		'^.+\\.(ts|tsx)?$': [
			'ts-jest',
			{ diagnostics: { ignoreCodes: ['TS151001'] } },
		],
	},
	clearMocks: true,
	testEnvironment: 'node',
	testMatch: ['**/?(*.)+(test)\\.(ts)'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	moduleDirectories: ['node_modules', 'src'],
	modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
