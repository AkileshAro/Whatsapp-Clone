import { Chat } from "@material-ui/icons";
import React, { useState, createContext } from "react";

export const CurrentChatContext = createContext();

export const CurrentChatProvider = ({ children }) => {
    const [currentChat, setCurrentChat] = useState('');

    return <CurrentChatContext.Provider value={{ currentChat, setCurrentChat }}>
        {children}
    </CurrentChatContext.Provider>
}