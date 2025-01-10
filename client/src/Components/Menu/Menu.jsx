import React, { useEffect } from 'react'
import RecentMenu from '../RecentMenu/RecentMenu'
import { useLocation } from 'react-router-dom';

export default function Menu() {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0,0)
    }, [pathname]);
    
return (


    <>
        <RecentMenu />
    </>

)


}
