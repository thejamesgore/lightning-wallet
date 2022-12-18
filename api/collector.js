const puppeteer = require('puppeteer')
var CryptoJS = require('crypto-js')

const collectKeys = async (url) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  //   get admin key
  const [adminKey] = await page.$x(
    '//*[@id="vue"]/div[2]/main/div[1]/div[2]/div/div[2]/div/div[1]/div/div[2]/div[1]/em[2]'
  )
  const adminText = await adminKey.getProperty('textContent')
  const rawAdminText = await adminText.jsonValue()

  // get read key
  const [readKey] = await page.$x(
    '//*[@id="vue"]/div[2]/main/div[1]/div[2]/div/div[2]/div/div[1]/div/div[2]/div[1]/em[3]'
  )
  const readText = await readKey.getProperty('textContent')
  const rawReadText = await readText.jsonValue()

  // get wallet name

  const [walletName] = await page.$x(
    '//*[@id="vue"]/div[1]/aside/div/div[1]/a/div[3]/div[1]'
  )
  const walletText = await walletName.getProperty('textContent')
  const rawWalletName = await walletText.jsonValue()

  const niceData = [{ admin: rawAdminText }, { read: rawReadText }]

  console.log({ rawAdminText, rawReadText, rawWalletName })

  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(niceData),
    rawWalletName
  ).toString()

  console.log(ciphertext)
}

collectKeys(
  'https://legend.lnbits.com/wallet?usr=d8d45f4023d84f04876a75d308c85e8f&wal=ef8d252af23043ac95874764c589ece7'
)
