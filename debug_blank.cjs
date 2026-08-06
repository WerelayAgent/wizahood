const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname)));

const server = app.listen(3000, async () => {
    console.log('Server started on port 3000');
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('CONSOLE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
        page.on('response', response => {
            if (!response.ok()) {
                console.log('RESPONSE FAILED:', response.url(), response.status());
            }
        });

        await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle2' });
        console.log('Page loaded completely.');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
    server.close();
});
