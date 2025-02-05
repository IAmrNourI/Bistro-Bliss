    import axios from "axios";
    import { useState } from "react";

    export default function UploadFile() {
        async function uploadImage() {
            const input = document.getElementById('imageInput');
            if (input.files.length === 0) {
                alert('Please select an image.');
                return;
            } //validate
        
            const formData = new FormData();
            formData.append('image', input.files[0]); // Key must match the backend key ('image')
        
            try {
                const response = await axios.post('http://localhost:8085/api/menu/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Required for file uploads
                    },
                });
        
                if (response.status === 200) {
                    // alert('Image uploaded successfully: ' + JSON.stringify(response.data));
                    console.log(response);
                    
                    console.log('Image uploaded successfully: ' + JSON.stringify(response.data));
                } else {
                    alert('Failed to upload image.');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('An error occurred during the upload.');
            }
        }

    return (
        <>
            <input type="file" id="imageInput" accept="image/*" />
            <button onClick={(() => uploadImage())}>Upload</button>
        </>
    );
    }
