const CryptoJS = require('crypto-js')

const message = [{ url: 'www.google.com' }, { key: '5' }]
const key = 'my secret key'

const encrypted = CryptoJS.AES.encrypt(JSON.stringify(message), key)
const decrypted = CryptoJS.AES.decrypt(encrypted, key)

console.log(encrypted.toString()) // Outputs the original message
