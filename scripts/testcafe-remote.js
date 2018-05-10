const createTestCafe = require('testcafe');
const fs = require('fs');

let testcafe = null;

const jsonOutput = `./temp/${new Date().getTime()}.json`;
const stream = fs.createWriteStream(jsonOutput);

var connectionPromises = [];

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




// testcafe remote:3 tests/sample-fixture.js


createTestCafe('localhost', 1320)
  .then(tc => {
    testcafe = tc;
    runner = testcafe.createRunner();
    console.log('[CONNECT URL]', testcafe.browserConnectionGateway.connectUrl);

    return waitForBrowsers(testcafe, 1)
      .then((browsers) => {
        console.log('All connected...');
        return runner
          .src('e2e/test-cafe/test1.js')
          .browsers(browsers)
          //.concurrency(2)
          .reporter('json', stream)
          .reporter('spec')
          .run();
      });
  })
  .then(d => {
    console.log('d', d);
  })
  .catch(e => console.error(e));
