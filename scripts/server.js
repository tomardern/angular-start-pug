const express = require('express');
const bodyParser = require('body-parser')
const createTestCafe = require('testcafe');
const fs = require('fs');


const app = express();
var concat = require('concat-stream');
app.use(bodyParser.text({type: '*/*'}));

let testcafe = null;

/**
 * Router
 */
app.post('/', (req, res) => {
  const testScript  = `./temp/script-${new Date().getTime()}.js`;
  fs.writeFileSync(testScript, req.body);

  const jsonOutput = `./temp/${new Date().getTime()}.json`;
  const stream = fs.createWriteStream(jsonOutput);

  createTestCafe('localhost', 1340)
    .then(tc => {
      testcafe = tc;
      runner = testcafe.createRunner();

      return runner
        .src(testScript)
        .browsers('chrome:headless')
        .reporter('json', stream)
        .reporter('spec')
        .run();
    })
    .then(failedCount => {
      stream.end();

      var data = fs.readFileSync(jsonOutput, 'utf8');
      testcafe.close();
      res.status(200).send(data);
  })
  .catch(e => res.status(500).send(e.toString()));
});

app.listen(3010, () => console.log('Example app listening on port 3010!'))