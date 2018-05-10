const express = require('express');
const bodyParser = require('body-parser')
const createTestCafe = require('testcafe');
const fs = require('fs');


const app = express();
var concat = require('concat-stream');
app.use(bodyParser.text({ type: '*/*' }));


/**
 * Wait for 'x' amount to connect
 * @param {testcafe} testcafe
 * @param {SVGAnimatedInteger} remoteCount
 */
var waitForBrowsers = function (testcafe, remoteCount) {
  var connectionPromises = [];

  for (var i = 0; i < remoteCount; i++) {
    const p = testcafe
      .createBrowserConnection()
      .then((bc) => {
        return new Promise((resolve, reject) => {
          bc.once('ready', () => {
            console.log('CONNECTED', bc.userAgent);
            resolve(bc);
          });
        });
      })
    connectionPromises.push(p);
  }

  return Promise.all(connectionPromises);
}


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

  createTestCafe('localhost', portToUse)
    .then(tc => {
      testcafe = tc;
      console.log('[CONNECT URL]', testcafe.browserConnectionGateway.connectUrl);
      return waitForBrowsers(testcafe, 1)
    })
    .then((browsers) => {
      console.log('All connected... running', testScript);
      return testcafe.createRunner()
        .src(testScript)
        .browsers(browsers)
        //.concurrency(2)
        .reporter('json', stream)
        .reporter('spec')
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