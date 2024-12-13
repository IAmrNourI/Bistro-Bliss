import axios from 'axios';
import React, { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { verify } from "../../network/user.api";


export default function Ottp() {
    const location = useLocation();
    const { email } = location.state || {};
    const [inputValue, setInputValue] = useState('');
    const isDisabled = inputValue.length !== 6;
    // const buttonRef = useRef(null); 

    const dataToSend = { email, otp: inputValue };

    const handleChange = (e) => {
        setInputValue(e.target.value);
        // if (buttonRef.current) {
        //     if (e.target.value.length === 6) {
        //     buttonRef.current.removeAttribute('disabled');
        //     } else {
        //     buttonRef.current.setAttribute('disabled', true);
        //     }
        // }
    };

    // async function ottpVerify() {
    //         let res = await axios.post('http://localhost:8080/api/verify-otp', {
    //             email, 
    //             otp: inputValue
    //         });
    //         console.log(res);
    // }

    async function otpVerify() {
        console.log("heloo");
        console.log(dataToSend);
        
        
    const result = await verify(dataToSend)
    console.log(result)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
        
      });
            
    }
    



return (

    <>
        <div className='text-center mt-5'>
            <p>Ottp</p>
            <input 
            type="number" 
            name="ottp" 
            id="ottp" 
            value={inputValue}
            onChange={handleChange}
            />
            <div>
            <button /*disabled ref={buttonRef} */
            disabled={isDisabled} 
            onClick={otpVerify}
            className="mt-2">Verify</button>
            </div>
        </div>
    </>
    )
}
