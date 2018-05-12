const express = require('express');
const bodyParser = require('body-parser')
const createTestCafe = require('testcafe');
const fs = require('fs');

const lambdaChrome = require('testcafe-browser-provider-lambda-chrome');
console.log(lambdaChrome);

const app = express();
var concat = require('concat-stream');
app.use(bodyParser.text({ type: '*/*' }));

process.env.TESTCAFE_LAMBDA_CHROME_URL = 'http://localhost:3009';

console.log('LAMBDA URL', process.env.TESTCAFE_LAMBDA_CHROME_URL);

/**
 * Router
 */
app.post('/', (req, res) => {
  let testcafe = null;

  const testScript = `./temp/script-${new Date().getTime()}.js`;
  fs.writeFileSync(testScript, req.body);

  const jsonOutput = `./temp/${new Date().getTime()}.json`;
  const stream = fs.createWriteStream(jsonOutput);
  const portToUse = Math.floor(Math.random() * 9999) + 1000;

  let runner;
  let numberOfTests = 0;

  createTestCafe('localhost', portToUse)
    .then(tc => {
      testcafe = tc;

      // Prepare the runner
      runner = testcafe.createRunner()
        .src(testScript)
        .reporter('json', stream)
        .reporter('spec');

      return runner.bootstrapper._getTests();
    })
    .then((tests) => {
      numberOfTests = tests.length;
      console.log('Currently', tests.length, 'tests');
      console.log('[CONNECT URL]', testcafe.browserConnectionGateway.connectUrl);

      return runner.browsers('lambda-chrome')
        .concurrency(numberOfTests) // We want each browser to run just one test
        .run();
    })
    .then(() => {
      stream.end();
      var data = fs.readFileSync(jsonOutput, 'utf8');
      testcafe.close();
      res.status(200).send(data);
    })
    .catch(e => res.status(500).send(e.toString()));
});

app.listen(3010, () => console.log('Example app listening on port 3010!'))