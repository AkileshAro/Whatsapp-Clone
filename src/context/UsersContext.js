import React, { useEffect, useState, createContext } from 'react';
import { db } from '../firebase';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        db.collection('users').get().then(snapshot => {
            const arr = [];
            snapshot.forEach(doc => {
                arr.push({ id: doc.id, ...doc.data() });
            });
            setUsers(arr);
        }, err => {
            console.log(err);
        })
    }, [])

    return <UsersContext.Provider value={{ users }} >
        {children}
    </UsersContext.Provider>
}