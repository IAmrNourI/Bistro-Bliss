import React from 'react'
import notfound from '../../assets/notfound.png'

export default function Notfound() {
  return (
    <>
        <div className='d-flex justify-content-center align-items-center my-5'>
          <img src={notfound} alt="" width="600px" />
        </div>
    </>
  )
}
