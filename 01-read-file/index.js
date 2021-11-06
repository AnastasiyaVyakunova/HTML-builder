const fs = require('fs');
const path = require('path');

let pathFile = path.join(__dirname, 'text.txt');
let stream = new fs.ReadStream(pathFile, {encoding: 'utf8'});
stream.on('readable', function() {
  let data = stream.read();
  if (data !== null) {
    console.log(data);
  }
});

