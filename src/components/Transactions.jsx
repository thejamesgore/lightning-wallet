import React from 'react'

export const Transactions = ({ transactions }) => {
  const parseTx = (tx) => {
    const date = new Date(tx.time * 1000)
    const formattedDate = date.toLocaleDateString('en-GB')

    if (tx.pending) return null

    if (tx.amount > 0) {
      return (
        <div
          key={tx.checking_id}
          style={{ wordWrap: 'break-word' }}
          className=""
        >
          <p style={{ wordWrap: 'break-word' }}>
            Received from {tx.bolt11.substring(0, 25)}...
          </p>
          <p>+{tx.amount / 1000} sats</p>
          <p className="">{formattedDate}</p>
        </div>
      )
    }

    if (tx.amount < 0) {
      return (
        <div id={tx.checking_id} key={tx.checking_id} className="">
          <p style={{ wordWrap: 'break-word' }}>
            Sent with {tx.bolt11.substring(0, 25)}...
          </p>
          <p className="">{tx.amount / 1000} sats</p>
          <p className="">{formattedDate}</p>
        </div>
      )
    }
  }

  return (
    <div>
      <h3 className="font-bold">Transactions</h3>
      <p className="mt-4">
        {transactions &&
          transactions.map((transaction) => {
            return parseTx(transaction)
          })}
      </p>
    </div>
  )
}

export default Transactions
