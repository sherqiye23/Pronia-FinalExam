import { createContext, useEffect, useState } from "react";
export const basketContext = createContext()

export default function BasketProvider({children}) {
    let localbasket = JSON.parse(localStorage.getItem("basket"))
    let [basket, setBasket] = useState(localbasket ? localbasket : [])

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket))
    }, [basket])

    let value = {
        basket,
        setBasket
    }
    
    return (
        <basketContext.Provider value={value}>{children}</basketContext.Provider>
    )
}