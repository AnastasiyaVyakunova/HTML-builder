const fs = require('fs/promises');
const fss = require('fs');
const path = require('path');

let pathDirSrc = path.join(__dirname, 'files');
let pathDirCopy = path.join(__dirname, 'files-copy');

(async () => {
  await fs.mkdir(pathDirCopy, {recursive: true});
  const filesCopy = await fs.readdir(pathDirCopy, {withFileTypes: true});
  for (const file of filesCopy) {
    fss.unlink(pathDirCopy + '\\' + file.name, () => {});
  }
  const files = await fs.readdir(pathDirSrc, {withFileTypes: true});
  for (const file of files) {
    await fs.copyFile(pathDirSrc + '\\' + file.name, pathDirCopy + '\\' + file.name);
  }
})();
