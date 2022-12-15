import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { getWalletInfo, getTransactions, receivePayment } from '../lib/api'

const url = process.env.REACT_APP_BASE_URL

const Transactions = () => {
  const [invoice, setInvoice] = useState('')
  const [formData, setFormData] = useState({
    amount: 0,
    invoiceToPay: '',
  })
  const [paymentInfo, setPaymentInfo] = useState({
    paymentHash: '',
    checkingId: '',
  })

  const handleSend = (e) => {
    // Keep the page from refreshing when the form is submitted
    e.preventDefault()

    const headers = {
      'X-Api-Key': process.env.REACT_APP_READ_KEY,
    }
    const data = {
      bolt11: formData.invoiceToPay,
      out: true,
    }
    axios
      .post('https://legend.lnbits.com/api/v1/payments', data, { headers })
      .then((res) =>
        setPaymentInfo({
          paymentHash: res.data.payment_hash,
          checkingId: res.data.checking_id,
        })
      )
      .catch((err) => console.log(err))

    return
  }

  const handleReceive = (e) => {
    // Keep the page from refreshing when the form is submitted
    e.preventDefault()

    const headers = {
      'X-Api-Key': '5312e544171c47b3b55111e0d4579f6d',
    }
    const data = {
      amount: formData.amount,
      out: false,
      // ToDo: Add additional form for user to be able to customize the memo
      memo: 'LNBits',
    }
    axios
      .post('https://legend.lnbits.com/api/v1/payments', data, { headers })
      .then((res) => setInvoice(res.data.payment_request))
      .catch((err) => console.log(err))

    return
  }

  return (
    <div className="w-[300px] ">
      {/* RECEIVE */}
      <h2>Receive</h2>
      <form>
        <label>enter amount</label>
        <input
          type="number"
          min="0"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        <button className="button" onClick={(e) => handleReceive(e)}>
          Submit
        </button>
      </form>

      {/* PAY */}
      <h2>Pay</h2>
      <form>
        <label>paste an invoice</label>
        <input
          type="text"
          value={formData.invoiceToPay}
          onChange={(e) =>
            setFormData({ ...formData, invoiceToPay: e.target.value })
          }
        />
        <button className="" onClick={(e) => handleSend(e)}>
          Submit
        </button>
      </form>

      {/* recieve info */}
      {invoice && (
        <section>
          <h3>Invoice created</h3>
          <p>{invoice}</p>
          {/* ToDo: Create a QR code out of this invoice as well */}
        </section>
      )}

      {/* payment info */}
      {paymentInfo.paymentHash && (
        <section>
          <h3>Payment sent</h3>
          <p>Payment hash: {paymentInfo.paymentHash}</p>
          <p>Checking id: {paymentInfo.checkingId}</p>
        </section>
      )}
    </div>
  )
}

export default Transactions
