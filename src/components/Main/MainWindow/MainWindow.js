import React, { useEffect, useState } from 'react';
import { SentimentSatisfiedAlt } from '@material-ui/icons';
import { withRouter, useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import './MainWindow.scss';
const MainWindow = (props) => {
    const { chatId } = useParams();
    const [chat, setChat] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log("works");
        db.collection('chats').doc(chatId).onSnapshot(snap => setChat(snap.data().name));
        db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snap => {
            setMessages(snap.docs.map(doc => doc.data()));
        })
    }, [chatId])

    const addMessage = (e) => {
        e.preventDefault();
        // db.collection('chats').doc(chatId).collection('messages').add()
    }

    return (
        <div className='main-window'>
            <div className="header">
                <h4>{chat}</h4>
            </div>
            <div className="main-chat">
                {messages.map(msg => {
                    return (
                        <div className="message">
                            <p>{msg && msg.message}</p>
                        </div>
                    )
                })}
            </div>
            <form className="message-field" onSubmit={(event) => addMessage(event)}>
                <SentimentSatisfiedAlt style={{ marginRight: '10px' }} />
                <input type="text" placeholder="Type a message" />
            </form>
        </div>
    )
}

export default withRouter(MainWindow);
