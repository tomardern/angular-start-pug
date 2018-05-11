# AngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## From B&W Repo
testcafe "chrome:headless" e2e/test-cafe/test1.js
testcafe "firefox:headless" e2e/test-cafe/test1.js
testcafe "chrome:emulation:device=iphone 6" tests/sample-fixture.js

# Install a local package
npm install ./testcafe-browser-provider-remote-lambda --save-dev

"ng": "ng",
"pug:watch": "f(){ node node_modules/pug-cli/index.js -P -O ./src/translations/$1.json -w ./src/**/*.pug ;};f",
"pug:build": "f(){ node node_modules/pug-cli/index.js -P -O ./src/translations/$1.json ./src/**/*.pug ;};f",
"ng1:compile": "f(){ grunt basic-build-for-ng2 --lang_code=$1 ;};f",
"dev": "f(){ npm run ng1:compile -- $1 && npm run pug:watch -- $1 & ng serve ;};f",
"build": "f(){ npm run pug:build -- $1 & ng build --prod --no-aot ;};f",
"dist": "npm run build && http-server-spa dist/",
"ng-test": "jest src/",
"test:watch": "jest --watch",
"test:ci": "jest --runInBand --coverage",
"lint": "ng lint",
"e2e": "ng e2e",


## For CI
See https://github.com/angular/angular-cli/wiki/stories-continuous-integration
```ng test --single-run --no-progress --browser=ChromeNoSandbox```
```ng e2e --no-progress --config=protractor-ci.conf.js```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
