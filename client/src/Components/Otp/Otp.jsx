import axios from 'axios';
import React, { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { resendOtp, verify } from "../../network/user.api";


export default function Otp() {
    const navigate = useNavigate()
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

    async function otpVerify() {
        // console.log(dataToSend);
        const result = await verify(dataToSend)
        
        if(result.data.success){
            navigate("/auth/login");
        }else {
            //result.data.message  >> dispaly the err
        }
    }

    async function sendotp() {
        // console.log(dataToSend);
        const result = await resendOtp({email,})
        
        
        if(result.data.success){
            // tost >> otp resend succ 
        }else {
            //result.data.message  >> dispaly the err
        }
    }
    
    



return (

    <>
        <div class="otp mb-3 text-center mt-5">
            <p className='fw-bold'>Otp</p>
            <input 
            type="number" 
            name="otp" 
            id="otp" 
            value={inputValue}
            onChange={handleChange}
            />

        <div>
        <button /*disabled ref={buttonRef} */
            disabled={isDisabled} 
            onClick={otpVerify}
            className="btn btn-register text-center mt-2 otp-btn">Verify</button>
        </div>


            
            <div>
                <button
                className='resend-otp-btn' 
                onClick={sendotp} >Resend otp</button>
            </div>
            
        </div>
    </>
    )
}
