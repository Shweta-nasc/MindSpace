import puppeteer from 'puppeteer-core'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const URL = 'http://localhost:4173/'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--window-size=1440,900'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 })

// entry shot
await page.waitForSelector('input[type="password"]')
await new Promise((r) => setTimeout(r, 1200))
await page.screenshot({ path: 'shot-0-entry.png' })

await page.type('input[type="password"]', 'sanctuary')
await page.click('button[type="submit"]')
await page.waitForSelector('aside nav button')
await new Promise((r) => setTimeout(r, 1600))
await page.screenshot({ path: 'shot-1-home.png' })

const grab = async (idx, name) => {
  await page.evaluate((i) => document.querySelectorAll('aside nav button')[i]?.click(), idx)
  await new Promise((r) => setTimeout(r, 1600))
  await page.screenshot({ path: name })
}
await grab(2, 'shot-2-code.png')
await grab(6, 'shot-3-travel.png')
await grab(8, 'shot-4-journey.png')
await grab(9, 'shot-5-music.png')

await browser.close()
console.log('done')
