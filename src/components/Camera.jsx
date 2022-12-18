import React, { useState, useContext } from 'react'
import { QrReader } from 'react-qr-reader'

import { StateContext } from '../context'

const Camera = (props) => {
  const { setCamData } = useContext(StateContext)

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setCamData(result?.text)
          }

          if (!!error) {
            console.info(error)
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  )
}

export default Camera
