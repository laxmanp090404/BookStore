import React, { useEffect, useState } from "react";

const useOnline = () => {
    const [onlinestatus,setOnlinestatus]  = useState(true);
    /**
     * remove event listeners after listening
     */
    const handleOnline = ()=>{
        setOnlinestatus(true);
    }
    const handleOffline = ()=>{
        setOnlinestatus(false);
    }
    useEffect(()=>{
        
        window.addEventListener('online',handleOnline)
        window.addEventListener('offline',handleOffline)
        return (()=>{
            window.removeEventListener('online',handleOnline);
            window.removeEventListener('offline',handleOffline)
        })
    },[])

    return onlinestatus;
};

export default useOnline;
