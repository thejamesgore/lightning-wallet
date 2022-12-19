import React, { useState, useContext } from 'react'

import axios from 'axios'

import { Camera } from '../components'

import { StateContext } from '../context'

const Send = () => {
  const [formData, setFormData] = useState({
    amount: 0,
    invoiceToPay: '',
  })
  const [paymentInfo, setPaymentInfo] = useState({
    paymentHash: '',
    checkingId: '',
  })

  const { theme, getWalletBalance } = useContext(StateContext)

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

    setTimeout(getWalletBalance, 10000)

    return
  }

  return (
    <div className="sm:w-[580px]">
      <form className="flex mt-32   flex-col  ">
        <div className=" flex justify-center flex-col items-center ">
          <h2 className="dark:text-slate-300 font-bold uppercase">
            Paste payment request
          </h2>
          <textarea
            className="mt-2 w-[380px] h-[280px]"
            type="text"
            value={formData.invoiceToPay}
            onChange={(e) =>
              setFormData({ ...formData, invoiceToPay: e.target.value })
            }
          />
          <div className="">
            <button
              className={`font-semibold text-[16px] mt-4 ${
                theme === 'dark' ? 'text-white' : ''
              } leading-[26px]  min-h-[52px] px-8 mt-2 ml-18 rounded-[10px] bg-slate-400 dark:text-[#2c2f32]`}
              onClick={(e) => handleSend(e)}
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {paymentInfo.paymentHash && (
        <section>
          <h3 className="dark:text-slate-300">Payment sent</h3>
          <p className="dark:text-slate-300">
            Payment hash: {paymentInfo.paymentHash}
          </p>
          <p className="dark:text-slate-300">
            Checking id: {paymentInfo.checkingId}
          </p>
        </section>
      )}
    </div>
  )
}

export default Send
