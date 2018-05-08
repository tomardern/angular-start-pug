module.exports = {
  "preset": "jest-preset-angular",
  "setupTestFrameworkScriptFile": "<rootDir>/src/setupJest.ts",
  "moduleNameMapper": {
    "app/(.*)": "<rootDir>/src/to/app/$1",
    "testing/(.*)": "<rootDir>/app/testing/$1"
  },
  "coveragePathIgnorePatterns": [
    "src/jestGlobalMocks.ts"
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic)"
  ]
};