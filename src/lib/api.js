import axios from 'axios'

const WALLET_ID = process.env.REACT_APP_WALLET_ID
const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY
const READ_KEY = process.env.REACT_APP_READ_KEY
const BASE_URL = 'https://legend.lnbits.com/api/v1'

export const getWalletInfo = async () => {
  const headers = {
    'X-Api-Key': READ_KEY,
  }

  const response = await axios.get(`${BASE_URL}/wallet`, {
    headers,
  })

  return response.data
}

export const getTransactions = async () => {
  const headers = {
    'X-Api-Key': READ_KEY,
  }
  const response = await axios.get(`${BASE_URL}/payments`, { headers })

  return response.data
}

export const receivePayment = async (body) => {
  const headers = {
    'X-Api-Key': READ_KEY,
  }

  const data = await axios.post(`${BASE_URL}/payments`, body, { headers })

  console.log(data)

  return data
}
