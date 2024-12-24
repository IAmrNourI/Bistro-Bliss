import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOtp, verify } from "../../network/user.api";
import toast from "react-hot-toast";

export default function Otp() {
const navigate = useNavigate();
const location = useLocation();
const [inputValue, setInputValue] = useState("");
const isDisabled = inputValue.length !== 6;
const [reDisabled, setReDisabled] = useState(false);
const [isLoding, setIsLoding] = useState(false);
const [reLoding, setReLoding] = useState(false);
const [countdown, setCountdown] = useState(60);
const [isOtpSent, setIsOtpSent] = useState(false); 

const { email } = location.state || {};

useEffect(() => {
toast.success("otp send successfuly");
}, []);

const dataToSend = { email, otp: inputValue };

const handleChange = (e) => {
setInputValue(e.target.value);
};

async function handleOtp() {
await sendOtp();
setIsOtpSent(true);  
timeout();
}

async function otpVerify() {
setIsLoding(true);
const result = await verify(dataToSend)
    .then((res) => {
    navigate("/auth/login");
    setIsLoding(false);
    })
    .catch((res) => {
    setIsLoding(true);
    toast.error(res.response.data.message);
    setIsLoding(false);
    });
}

async function sendOtp() {
setReLoding(true);
const result = await resendOtp({ email });
if (result.data.success) {
    toast.success(result.data.message);
}
setReLoding(false);
}

function timeout() {
setReDisabled(true); 
let calldown = 60; 
setCountdown(calldown);

const time = setInterval(() => {
    calldown--; 
    setCountdown(calldown); 
    if (calldown === 0) {
    clearInterval(time);
    setReDisabled(false); 
    }
}, 1000);
}

return (
<>
    <div className="otp mb-3 text-center mt-5">
    <p className="fw-bold">Otp</p>
    <input
        type="number"
        name="otp"
        id="otp"
        value={inputValue}
        onChange={handleChange}
    />

    <div>
        <button
        disabled={isDisabled}
        onClick={otpVerify}
        className="btn btn-register text-center mt-2 otp-btn"
        >
        {isLoding ? <i className="fas fa-spinner fa-spin"></i> : "Verify"}
        </button>
    </div>

    <div>
        <button
        disabled={reDisabled}
        className="btn btn-register text-center mt-2 otp-btn"
        onClick={handleOtp}
        >
        {reLoding ? (
            <i className="fas fa-spinner fa-spin"></i>
        ) : isOtpSent ? (
            countdown > 0 ? (
            `${countdown}`
            ) : (
            "Resend otp"
            )
        ) : (
            "Resend otp"
        )}
        </button>
    </div>
    </div>
</>
);
}
