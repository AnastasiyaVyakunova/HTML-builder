const fs = require('fs/promises');
const fss = require('fs');
const path = require('path');

let pathDir = path.join(__dirname, 'secret-folder');

(async () => {
  const files = await fs.readdir(pathDir, {withFileTypes: true});
  for (const file of files) {
    if(file.isFile()) {
      let fileName = path.parse(file.name).name;
      let extName = path.extname(file.name).slice(1);
      fss.stat(pathDir + `\\` + file.name, (err, stats) => {
        if (err) throw err;
        let fileSize = stats.size / 1024;
        console.log(`${fileName} - ${extName} - ${fileSize}kb`);
      });
    }
  }
})();