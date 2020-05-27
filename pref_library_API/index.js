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
        const cleaned = res.rawResponse.replace(/@/g, 'ao')
        const output = JSON.parse(cleaned.slice(1, cleaned.length))
        //console.log(output.sequences[0].canvases)
        makeFolder(output, function (out) {
          for (let i = 0; i < out.sequences[0].canvases.length; i++) {
            //console.log(out.sequences[0].canvases[i].label)
            //console.log(out.sequences[0].canvases[i].images[0].resource.id)
            request
              .get(out.sequences[0].canvases[i].images[0].resource.aoid)
              .pipe(fs.createWriteStream(`./outputs/${out.label}/${out.sequences[0].canvases[i].label}.jpg`))
          }
        })
      }
    })
}

main();