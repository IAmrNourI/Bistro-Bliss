import { createContext, useState } from "react";


export let UserContext = createContext()

export default function UserContextProvider(props){

    const [userLogin, setuserLogin] = useState(localStorage.getItem("userToken") || null
    );

    const [userId, setuserId] = useState(localStorage.getItem("userId" || null)
    );

    return <UserContext.Provider value={{userId, setuserId, userLogin, setuserLogin}}>
        {props.children}
    </UserContext.Provider>
}

