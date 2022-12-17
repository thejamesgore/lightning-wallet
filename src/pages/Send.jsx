import React, { useState, useContext } from 'react'
import { QRCode } from 'react-qrcode-logo'
import axios from 'axios'

import { StateContext } from '../context'

const Send = () => {
  const [invoice, setInvoice] = useState('')
  const [formData, setFormData] = useState({
    amount: 0,
    invoiceToPay: '',
  })
  const [paymentInfo, setPaymentInfo] = useState({
    paymentHash: '',
    checkingId: '',
  })

  const { theme } = useContext(StateContext)

  const handleSend = (e) => {
    e.preventDefault()
    console.log(e)

    const headers = {
      'X-Api-Key': process.env.REACT_APP_ADMIN_KEY,
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
    <div className="max-w-md ml-5  items-center justify-center ">
      <form className="flex mt-32  justify-center flex-col items-center ">
        <h2 className="dark:text-slate-300 font-bold uppercase">
          Paste or scan payment request
        </h2>
        <textarea
          className="mt-2"
          type="text"
          rows={11}
          cols={30}
          value={formData.invoiceToPay}
          onChange={(e) =>
            setFormData({ ...formData, invoiceToPay: e.target.value })
          }
        />
        <div className="">
          <button
            className={`font-semibold text-[16px] mt-4 ${
              theme === 'dark' ? 'text-white' : ''
            } leading-[26px]  min-h-[52px] px-8 mt-2 ml-18 rounded-[10px] bg-slate-400`}
            onClick={(e) => handleSend(e)}
          >
            Submit
          </button>
        </div>
      </form>
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

export default Send
