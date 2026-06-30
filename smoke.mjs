import puppeteer from 'puppeteer-core'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const URL = 'http://localhost:4173/'
const errors = []
const logs = []

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--window-size=1440,900'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console.error: ' + m.text())
  else logs.push(m.type() + ': ' + m.text())
})
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('requestfailed', (r) => {
  const u = r.url()
  // ignore optional external decorative assets
  if (/loremflickr|picsum|soundhelix|googleapis/.test(u)) return
  errors.push('requestfailed: ' + u + ' — ' + r.failure()?.errorText)
})

try {
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 })

  // Entry screen: type password + unlock
  await page.waitForSelector('input[type="password"]', { timeout: 10000 })
  await page.type('input[type="password"]', 'sanctuary')
  await page.click('button[type="submit"]')

  // Wait for the shell (nav with section buttons)
  await page.waitForSelector('aside nav button', { timeout: 10000 })
  await new Promise((r) => setTimeout(r, 1200))

  const hasCanvas = await page.$('canvas')
  const navCount = await page.$$eval('aside nav button', (b) => b.length)

  // Click through several sections to trigger atmosphere transitions
  const order = [2, 6, 8, 9, 10] // code, travel, journey, music, video
  for (const i of order) {
    await page.evaluate((idx) => {
      const btns = document.querySelectorAll('aside nav button')
      if (btns[idx]) btns[idx].click()
    }, i)
    await new Promise((r) => setTimeout(r, 900))
  }

  // Back to home
  await page.evaluate(() => document.querySelectorAll('aside nav button')[0]?.click())
  await new Promise((r) => setTimeout(r, 800))

  const title = await page.title()
  console.log('RESULT', JSON.stringify({ title, hasCanvas: !!hasCanvas, navCount }))
} catch (e) {
  errors.push('script: ' + e.message)
}

console.log('ERRORS', JSON.stringify(errors, null, 2))
await browser.close()
process.exit(errors.length ? 1 : 0)
