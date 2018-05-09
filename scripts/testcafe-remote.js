const createTestCafe = require('testcafe');
let testcafe         = null;

createTestCafe('localhost', 1340, 1341)
  .then(tc => {
    testcafe = tc;
    runner = testcafe.createRunner();

    return testcafe.createBrowserConnection();
  })
  .then(remoteConnection => {

    // Outputs remoteConnection.url so that it can be visited from the remote browser.
    console.log(remoteConnection.url);

  })
  .catch(error => console.error(error));