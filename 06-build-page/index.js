const fs = require('fs/promises');
const fss = require('fs');
const path = require('path');

let pathMainDir = path.join(__dirname, 'project-dist');
let pathTemplate = path.join(__dirname, 'template.html');
let pathIndex = path.join(__dirname, 'project-dist', 'index.html');
let pathComponents = path.join(__dirname, 'components');
let pathStyles = path.join(__dirname, 'styles');
let pathMainStyle = path.join(__dirname, 'project-dist', 'style.css');
let pathAssetsSrc = path.join(__dirname, 'assets');
let pathAssetsCopy = path.join(__dirname, 'project-dist', 'assets');

fss.writeFile(pathIndex, '', function(){});

(async () => {
  await fs.mkdir(pathMainDir, {recursive: true});
  const filesC = await fs.readdir(pathComponents, {withFileTypes: true});
  let stream = new fss.ReadStream(pathTemplate, {encoding: 'utf8'});
  stream.on('readable', function() {
    let data = stream.read();
    if (data !== null) {
      for (const file of filesC) {
        if (file.isFile() && path.extname(file.name) === '.html' && data.includes(`{{${path.parse(file.name).name}}}`)) {
          let streamC = new fss.ReadStream(path.join(pathComponents, file.name), {encoding: 'utf8'});
          streamC.on('readable', function() {
            let dataC = streamC.read();
            if (dataC !== null) {
              data = data.replace(`{{${path.parse(file.name).name}}}`, dataC);
              fss.writeFile(pathIndex, `${data}`, function(){}); 
            }
          });
        }
      }

    }
  });
  

  const filesS = await fs.readdir(pathStyles, {withFileTypes: true});
  for (const file of filesS) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      let streamS = new fss.ReadStream(path.join(pathStyles, file.name), {encoding: 'utf8'});
      streamS.on('readable', function() {
        let dataS = streamS.read();
        if (dataS !== null) {
          fss.appendFile(pathMainStyle, `${dataS} \n`, function(){});
        }
      });
    }
  }


  await fs.mkdir(pathAssetsCopy, {recursive: true});


  const filesCopy = await fs.readdir(pathAssetsCopy, {withFileTypes: true});
  for (const file of filesCopy) {
    if (file.isDirectory) {
      let pathRC = path.join(pathAssetsCopy, file.name);
      let fC = await fs.readdir(pathRC, {withFileTypes: true});
      for (const file of fC) {
        fss.unlink(path.join(pathRC, file.name), () => {});
      }
      await fs.rmdir(pathRC);
    }
  }

  const filesSrc = await fs.readdir(pathAssetsSrc, {withFileTypes: true});
  for (const file of filesSrc) {
    if (file.isDirectory()) {
      let pathDC = path.join(pathAssetsCopy, file.name);
      let pathDS = path.join(pathAssetsSrc, file.name);
      await fs.mkdir(pathDC, {recursive: true});
      let fS = await fs.readdir(pathDS, {withFileTypes: true}); 
      for (const file of fS) {
        await fs.copyFile(path.join(pathDS, file.name), path.join(pathDC, file.name));
      }
    }
  } 
})();

