import React, { createContext, useEffect, useState } from "react";
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log("User =>", user);
            setCurrentUser(user);
        })
    }, []);

    return <AuthContext.Provider value={{ currentUser, setCurrentUser }} >
        {children}
    </AuthContext.Provider>
}