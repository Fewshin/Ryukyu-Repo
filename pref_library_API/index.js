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

  request
    .get(link)
    .end((err, res) => {
      if (err) {
        console.log("Invalid Link!")
      }
      else {
        const output = JSON.parse(res.text)
        console.log(output)
      }
    })
}

main();