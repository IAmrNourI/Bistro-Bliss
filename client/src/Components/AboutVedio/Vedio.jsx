import React, { useState } from "react";
import vedioPic from "../../assets/aboutVideo.png";

export default function Vedio() {
    const [showVideo, setShowVideo] = useState(false);

return (
<>
    <section className="vedio">
    <div className="about-vedio position-relative">
            <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                {!showVideo ? (
                    <button 
                        onClick={() => setShowVideo(true)} 
                        className="btn-vedio mb-2"
                        aria-label="Play Video"
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            height="1.3em"
                            width="1.3em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path>
                        </svg>
                    </button>
                ) : (
                    <iframe 
                        className="position-absolute w-100 h-100"
                        src="https://www.youtube.com/embed/invOCNXAYKc?autoplay=1" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                )}

                {!showVideo && (
                    <h1 className="text-white vedio-header">
                        Feel the authentic & <br /> original taste from us
                    </h1>
                )}
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="vedio-item">
                        <div className="icon">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="text-4xl mt-[-4px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="2" d="M19,15 L23,15 L23,1 L9,1 L9,5 M15,19 L19,19 L19,5 L5,5 L5,9 M1,23 L15,23 L15,9 L1,9 L1,23 L1,23 L1,23 Z"></path></svg>
                        </div>
                        <div className="vedio-text">
                            <p>Multi Cuisine</p>
                            <p className="text-black">In the new era of technology we look in the future with certainty life.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="vedio-item">
                        <div className="icon">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="text-4xl mt-[-4px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 11H4V19H20V11ZM20 5H4V9H20V5ZM11 6V8H9V6H11ZM7 6V8H5V6H7Z"></path></svg>                        </div>
                        <div className="vedio-text">
                            <p>Easy To Order</p>
                            <p className="text-black">In the new era of technology we look in the future with certainty life.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="vedio-item">
                        <div className="icon">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-4xl mt-[-4px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"></path><path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"></path></svg>                        </div>
                        <div className="vedio-text">
                            <p>Fast Delivery</p>
                            <p className="text-black">In the new era of technology we look in the future with certainty life.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</>
);
}
