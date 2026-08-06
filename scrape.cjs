const options = {
  urls: ['https://wizacoin.fun/'],
  directory: './src',
};

async function run() {
    const scrape = (await import('website-scraper')).default;
    try {
        await scrape(options);
        console.log("Entire website downloaded successfully");
    } catch (e) {
        console.error(e);
    }
}
run();
