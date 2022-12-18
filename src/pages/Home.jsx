import React, { useState, useEffect } from 'react'
import * as cheerio from 'cheerio'
import axios from 'axios'

import Transactions from '../components/Transactions'

const Home = () => {
  const [keys, setKeys] = useState('')

  const getData = async () => {
    const response = await axios.get(
      'https://legend.lnbits.com/wallet?usr=d8d45f4023d84f04876a75d308c85e8f&wal=ef8d252af23043ac95874764c589ece7'
    )
    // console.log(response.data)
    const $ = cheerio.load(response.data)
    const data = $('q-card').text()
    // console.log(data)
    setKeys(data)
  }

  useEffect(() => {
    getData()
  })

  const adminKey = keys
    .substring(keys.indexOf('Admin key: ') + 11)
    .substring(0, 32)

  const readKey = keys
    .substring(keys.indexOf('Invoice/read key: ') + 18)
    .substring(0, 32)

  console.log({ adminKey, readKey })

  return <div></div>
}

export default Home
