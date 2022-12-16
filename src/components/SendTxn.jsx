import React, { useState } from 'react'

import { QRCode } from 'react-qrcode-logo'
import axios from 'axios'

const SendTxn = () => {
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

  return (
    <div className="w-[1px] flex-1 items-center justify-center">
      <form className="items-center justify-center">
        <textarea
          type="text"
          rows={11}
          cols={30}
          value={formData.invoiceToPay}
          onChange={(e) =>
            setFormData({ ...formData, invoiceToPay: e.target.value })
          }
        />
        <button
          className="font-semibold text-[16px] leading-[26px]  min-h-[52px] px-8 mt-2 ml-20 rounded-[10px] bg-slate-400"
          onClick={(e) => handleSend(e)}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default SendTxn
