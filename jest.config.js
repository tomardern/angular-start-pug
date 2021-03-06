module.exports = {
  "bail": true, // Fail on first error
  "preset": "jest-preset-angular",
  "setupTestFrameworkScriptFile": "./setupJest.ts",
  "coverageThreshold": {
    "global": {
      "branches": 95,
      "functions": 95,
      "lines": 95,
      "statements": -10
    }
  },
  "moduleNameMapper": {
    "app/(.*)": "<rootDir>/src/to/app/$1",
    "testing/(.*)": "<rootDir>/app/testing/$1"
  },
  "coveragePathIgnorePatterns": [
    "jestGlobalMocks.ts",
    "setupJest.ts"
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic)"
  ]
};