import { useState } from "react";

export function useOnline(){
        const[isOnline, setIsOnline] = useState(true);
        window.addEventListener("online", ()=>{setIsOnline(true)})
        window.addEventListener("offline", ()=>{setIsOnline(false)})

        return isOnline
    
}