const createTestCafe = require('testcafe');
const fs = require('fs');

let testcafe = null;

const jsonOutput = `./temp/${new Date().getTime()}.json`;
const stream = fs.createWriteStream(jsonOutput);

createTestCafe('localhost', 1340)
  .then(tc => {
    testcafe = tc;
    runner = testcafe.createRunner();

    return runner
      .src('e2e/test-cafe/test1.js')
      .browsers('chrome:headless')
      .reporter('json', stream)
      .reporter('spec')
      .run();
  })
  .then(failedCount => {
    stream.end();

    var data = fs.readFileSync(jsonOutput, 'utf8');
    console.log(data);
    testcafe.close();
})
.catch(e => console.error(e));
