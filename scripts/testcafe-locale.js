const createTestCafe = require('testcafe');
const fs = require('fs');

let runner           = null;
let testcafe = null;
const stream = fs.createWriteStream(`./${ new Date().getTime()}.json`);



createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe = tc;
        runner   = testcafe.createRunner();

        return testcafe.createBrowserConnection();
    })
    .then(remoteConnection => {

        // Outputs remoteConnection.url so that it can be visited from the remote browser.
        console.log(remoteConnection.url);

        remoteConnection.once('ready', () => {
            console.log("is ready!");
            return runner
                .src('./e2e/test-cafe/test1.js')
                .concurrency(1)
                .browsers(remoteConnection)
                .reporter('json', stream)
                .reporter('spec')
                .run()
                .then(failedCount => {
                    stream.end();

                    console.log(failedCount);
                    testcafe.close();
                })
                .catch(e => console.log(e));
        });
    });