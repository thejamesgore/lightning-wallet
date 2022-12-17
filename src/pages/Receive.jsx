import React, { useState, useContext } from 'react'
import { QRCode } from 'react-qrcode-logo'
import axios from 'axios'

import { StateContext } from '../context'

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

  const { theme } = useContext(StateContext)

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
      <div className="max-w-md ml-5 ">
        <form className="flex justify-center mt-32 flex-col items-center ">
          <h2 className="dark:text-slate-300 font-bold uppercase">
            Create payment request
          </h2>
          <label className="dark:text-slate-300 mt-3 font-semibold">
            Enter number of Satoshis
          </label>
          <input
            className="my-2 text-center"
            type="number"
            min="0"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
          <button
            className={`font-semibold text-[16px] mt-4 ${
              theme === 'dark' ? 'text-white' : ''
            } leading-[26px]  min-h-[52px] px-8 mt-2 ml-18 rounded-[10px] bg-slate-400`}
            onClick={(e) => handleReceive(e)}
          >
            Submit
          </button>
        </form>
      </div>
      {invoice && (
        <section className="my-3 max-w-md  ml-5">
          <h3
            style={{ textAlign: 'center' }}
            className="dark:text-slate-300 mb-2 "
          >
            Invoice created
          </h3>
          <div className="display flex justify-center items-center">
            <QRCode value={invoice} size={300} />
          </div>
          <div className="">
            <p
              style={{ wordWrap: 'break-word' }}
              className="dark:text-slate-300 mt-3 "
            >
              {invoice}
            </p>
          </div>
          {/* ToDo: Create a QR code out of this invoice as well */}
        </section>
      )}
    </div>
  )
}

export default Receive
