const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        if (f === '.git' || f === 'node_modules') return;
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let modifiedFiles = 0;

walkDir('.', (filePath) => {
    const ext = path.extname(filePath);
    if (!['.html', '.js', '.json', '.txt', '.css'].includes(ext)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Wiza -> Wizahood (case sensitive checks)
    content = content.replace(/\bWizacoin\b/g, 'Wizahood');
    content = content.replace(/\bwizacoin\b/g, 'wizahood');
    content = content.replace(/\bWIZACOIN\b/g, 'WIZAHOOD');
    
    content = content.replace(/\bWiza\b/g, 'Wizahood');
    content = content.replace(/\bwiza\b/g, 'wizahood');
    content = content.replace(/\bWIZA\b/g, 'WIZAHOOD');

    // Solana -> Robinhood Chain
    content = content.replace(/\bSolana\b/g, 'Robinhood Chain');
    content = content.replace(/\bsolana\b/g, 'robinhood chain');
    content = content.replace(/\bSOLANA\b/g, 'ROBINHOOD CHAIN');
    
    // SOL -> ETH
    content = content.replace(/\bSOL\b/g, 'ETH');

    // pump.fun
    content = content.replace(/pump\.fun/gi, 'Pons Family');

    // CA Replace
    if (filePath.endsWith('index.html') || filePath.endsWith('.js')) {
        // Base58 Solana addresses (often 43-44 characters, but let's just do a naive check for long alphanumeric strings)
        content = content.replace(/\b[1-9A-HJ-NP-Za-km-z]{43,44}\b/g, 'Coming soon on Pons');
        // EVM Addresses
        content = content.replace(/0x[a-fA-F0-9]{40}/gi, 'Coming soon on Pons');
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
        modifiedFiles++;
    }
});

console.log(`Rebranding complete! Modified ${modifiedFiles} files.`);
