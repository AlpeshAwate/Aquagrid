import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  page.on('console', msg => console.log('LOG:', msg.text()));
  
  await page.goto('http://localhost:5173/retail-dashboard', { waitUntil: 'networkidle0' });
  
  console.log("Taking screenshot 1...");
  await page.screenshot({ path: 'screenshot1.png' });
  
  console.log("Waiting 3 seconds...");
  await new Promise(r => setTimeout(r, 3000));
  
  console.log("Taking screenshot 2...");
  await page.screenshot({ path: 'screenshot2.png' });
  
  await browser.close();
  process.exit(0);
})();