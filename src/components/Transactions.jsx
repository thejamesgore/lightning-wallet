import React from 'react'

export const Transactions = ({ transactions }) => {
  const parseTx = (tx) => {
    const timestamp = tx.time * 1000
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleDateString('en-GB')
    const hours = date.getHours()
    const mins = ('0' + date.getMinutes()).slice(-2)

    if (tx.pending) return null

    if (tx.amount > 0) {
      return (
        <div
          key={tx.checking_id}
          style={{ wordWrap: 'break-word' }}
          className="dark:text-slate-300"
        >
          <div className="flex ">
            <p
              style={{ wordWrap: 'break-word' }}
              className="dark:text-slate-300 font-semibold mr-1"
            >
              Received from
            </p>
            {tx.bolt11.substring(0, 25)}...
          </div>
          <p className="dark:text-slate-300">+{tx.amount / 1000} sats</p>
          <p className="dark:text-slate-300">{formattedDate}</p>
        </div>
      )
    }

    if (tx.amount < 0) {
      return (
        <div
          id={tx.checking_id}
          key={tx.checking_id}
          className="dark:text-slate-300"
        >
          <div className="flex">
            <p
              style={{ wordWrap: 'break-word' }}
              className="dark:text-slate-300 mr-1 font-semibold"
            >
              Sent with
            </p>
            <p>{tx.bolt11.substring(0, 25)}...</p>
          </div>
          <p className="dark:text-slate-300">{tx.amount / 1000} sats</p>
          <p className="dark:text-slate-300">{formattedDate}</p>
        </div>
      )
    }
  }

  return (
    <div>
      <h3 className="font-bold dark:text-slate-300 uppercase">Transactions</h3>
      <p className="mt-4 dark:text-slate-300">
        {transactions &&
          transactions.map((transaction) => {
            return parseTx(transaction)
          })}
      </p>
    </div>
  )
}

export default Transactions
