import React, { useState, useEffect, createContext } from 'react';
import { db } from './firebase';

export const ChatContext = createContext();

export const ChatProvider = props => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        console.log('ran');
        db.collection('chats').get().then(res => {
            let chatsArr = [];
            res.forEach(doc => {
                chatsArr.push({ id: doc.id, ...doc.data() });
            })
            setChats(chatsArr);
        })
    }, []);

    return (
        <ChatContext.Provider value={{ chats, setChats }}>
            {props.children}
        </ChatContext.Provider>
    )
}


