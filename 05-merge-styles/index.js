const fs = require('fs/promises');
const fss = require('fs');
const path = require('path');

let pathDirSrc = path.join(__dirname, 'styles');
let pathResult = path.join(__dirname, 'project-dist', 'bundle.css');

fss.writeFile(pathResult, '', function(){});
(async () => {
  const files = await fs.readdir(pathDirSrc, {withFileTypes: true});
  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      let stream = new fss.ReadStream(path.join(pathDirSrc, file.name), {encoding: 'utf8'});
      stream.on('readable', function() {
        let data = stream.read();
        if (data !== null) {
          fss.appendFile(pathResult, `${data} \n`, function(){});
        }
        
      });
    }
  }
})();