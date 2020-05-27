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

async function main () {

const link = await askQuestion("Please Input Link\n");
//console.log(link)
  request
    .get(link)
    .end((res, err) => {
      if (err) {
        console.log("PANIC!")
        //console.log(err)
      }
      else {
        const output = JSON.parse(res.rawResponse.slice(1, res.rawResponse.length))
        console.log(output)
        //console.log(res.rawResponse.title)
      }
    })
}

main();