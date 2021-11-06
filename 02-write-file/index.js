const fs = require('fs');
const path = require('path');

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

let pathFile = path.join(__dirname, 'text.txt');
fs.open(pathFile, 'a', (err) => { 
  if(err) throw err;
});

const rl = readline.createInterface({ input, output });

console.log('Enter something:');

function writingToFile() {
  rl.question('', (answer) => {
    if (answer !== 'exit') {
      fs.appendFile(pathFile, `${answer}\n`, function(){});
      writingToFile();
    } else {
      rl.close();
    }
  });
}

writingToFile();
rl.on('close', () => {
  console.log('Finish!');
});


