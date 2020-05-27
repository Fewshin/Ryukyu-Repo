const request = require('superagent')
const fs = require("fs")
const readline = require('readline');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

function makeFolder (output, callback) {
  fs.mkdir(`./outputs/${output.label}`, function(err) {
    if (err) {
      console.log(err)
      return
    } 
    else {
      console.log(`Dir ${output.label} created!`)
      const out = output
      return callback(out)
    }
  })
}

async function main () {
  const link = await askQuestion("Please Input Link\n");
  request
    .get(link)
    .end((res, err) => {
      if (err) {
        console.log("PANIC!")
        console.log(err)
      }
      else {
        const output = JSON.parse(res.rawResponse.slice(1, res.rawResponse.length))
        console.log(output)
        makeFolder(output, function (out) {
          console.log("hahaxd")
        })
      }
    })
}

main();