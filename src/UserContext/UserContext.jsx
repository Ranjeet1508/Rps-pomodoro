import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const[userName, setUserName] = useState("");

    return (
        <UserContext.Provider value={{userName, setUserName}}>
            {children}
        </UserContext.Provider>
    )
}