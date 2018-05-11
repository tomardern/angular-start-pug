# testcafe-browser-provider-lambda-chrome
[![Build Status](https://travis-ci.org/tomardern/testcafe-browser-provider-lambda-chrome.svg)](https://travis-ci.org/tomardern/testcafe-browser-provider-lambda-chrome)

This is the **lambda-chrome** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

```
npm install testcafe-browser-provider-lambda-chrome
```

## Usage


You can determine the available browser aliases by running
```
testcafe -b lambda-chrome
```

When you run tests from the command line, use the alias when specifying browsers:

```
testcafe lambda-chrome:browser1 'path/to/test/file.js'
```


When you use API, pass the alias to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('lambda-chrome:browser1')
    .run();
```

## Author
Tom Ardern 
