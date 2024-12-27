import React from 'react'
import toast from 'react-hot-toast'

export default function ReceiveSocket() {

    function socket(){
        toast.success("hello world")
    }

return (

    <>
    <div className="vh-100 text-center mt-5">
        <button onClick={socket} className="btn btn-primary">ReceiveSocket</button>
    </div>
    </>
)


}
