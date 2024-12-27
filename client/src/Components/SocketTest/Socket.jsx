import React from 'react'

export default function Socket() {


    function hello(){
        console.log("hello world");
        
    }

return (
    <>
        <div className='vh-100 text-center mt-5'>
            <button onClick={hello} className='btn btn-primary'>Socket</button>
        </div>
    </>
)


}
