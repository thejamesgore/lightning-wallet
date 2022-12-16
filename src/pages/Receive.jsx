import React, { useState } from 'react'

import { QRCode } from 'react-qrcode-logo'
import axios from 'axios'

const Receive = () => {
  const [invoice, setInvoice] = useState('')
  const [formData, setFormData] = useState({
    amount: 0,
    invoiceToPay: '',
  })
  const [paymentInfo, setPaymentInfo] = useState({
    paymentHash: '',
    checkingId: '',
  })

  const handleReceive = (e) => {
    // Keep the page from refreshing when the form is submitted
    e.preventDefault()

    const headers = {
      'X-Api-Key': process.env.REACT_APP_READ_KEY,
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
    <div>
      {' '}
      <form className="flex justify-center flex-col items-center">
        <h2 className="dark:text-slate-300 font-bold uppercase">
          Create payment request
        </h2>
        <label className="dark:text-slate-300 mt-3 font-semibold">
          enter amount
        </label>
        <input
          className="my-2 text-center"
          type="number"
          min="0"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        <button
          className="button dark:text-slate-300 dark:bg-[#2c2f32] mt-3 py-3 px-5 rounded-xl"
          onClick={(e) => handleReceive(e)}
        >
          Submit
        </button>
      </form>
      {invoice && (
        <section className="my-3">
          <h3
            style={{ textAlign: 'center' }}
            className="dark:text-slate-300 mb-2"
          >
            Invoice created
          </h3>
          <QRCode value={invoice} size={300} />
          <p
            style={{ wordWrap: 'break-word' }}
            className="dark:text-slate-300 mt-3"
          >
            {invoice}
          </p>
          {/* ToDo: Create a QR code out of this invoice as well */}
        </section>
      )}
    </div>
  )
}

export default Receive
