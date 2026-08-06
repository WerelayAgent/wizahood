const https = require('https');
const fs = require('fs');
const path = require('path');

const files = [
  '/assets/ui-vendor-BP3KvGBO.js',
  '/assets/utils-vendor-CCeDs-2c.js',
  '/assets/query-vendor-C2QZtjiK.js',
  '/assets/router-vendor-E-RiApe2.js'
];

if (!fs.existsSync('assets')) {
  fs.mkdirSync('assets');
}

async function downloadFiles() {
  for (const file of files) {
    const url = `https://wizacoin.fun${file}`;
    const dest = path.join(__dirname, file);
    
    await new Promise((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(dest);
          response.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded: ${file}`);
            resolve();
          });
        } else {
          console.error(`Failed to download ${file}: ${response.statusCode}`);
          resolve();
        }
      }).on('error', (err) => {
        console.error(`Error downloading ${file}:`, err);
        resolve();
      });
    });
  }
}
downloadFiles();
