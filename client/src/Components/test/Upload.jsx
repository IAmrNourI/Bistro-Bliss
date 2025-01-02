    import axios from "axios";
    import { useState } from "react";

    export default function UploadFile() {
    const [image, setimage] = useState("");
    function handleImage(e) {
        console.log(e.target.files);
        setimage(e.target.files[0]);
    }

    async function handleApi() {
        const formData = new FormData();
        const token = localStorage.getItem("userToken");

        formData.append("uploadFile", image);
        try {
        const res = await axios.post(
            "http://localhost:8085/api/menu/upload",
            formData,
            {
            headers: {
                Authorization: `Bearer ${token}`, // إضافة التوكين في الهيدر
            },
            }
        );
        console.log(res);
        } catch (error) {
        console.error("Error uploading file:", error);
        }
    }

    return (
        <>
        <input type="file" name="file" onChange={handleImage} />
        <button onClick={handleApi}>submit</button>
        </>
    );
    }
