import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Chats.scss';
import { db } from '../../../firebase';
import { SentimentSatisfiedAlt } from '@material-ui/icons';
import { useParams } from 'react-router-dom'

function Chats() {
    const [chat, setChat] = useState('');
    const [messages, setMessages] = useState([]);
    const { chatId } = useParams();

    useEffect(() => {
        if (chatId) {
            db.collection('chats').doc(chatId).onSnapshot(snap => setChat(snap.data().name));
            db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snap => {
                setMessages(snap.docs.map(doc => doc.data()));
            })
        }
    }, [chatId])

    const addMessage = (e) => {
        e.preventDefault();
    }

    return (
        <div className='chats'>
            <Sidebar />
            {
                chatId ? <div className='main-window'>
                    <div className="header">
                        <h4>{chat}</h4>
                    </div>
                    <div className="main-chat">
                        {messages.map((msg, index) => {
                            return (
                                <div className="message" key={index}>
                                    <p>{msg && msg.message}</p>
                                </div>
                            )
                        })}
                    </div>
                    <form className="message-field" onSubmit={(event) => addMessage(event)}>
                        <SentimentSatisfiedAlt style={{ marginRight: '10px' }} />
                        <input type="text" placeholder="Type a message" />
                    </form>
                </div> : <h1>Add a chat</h1>
            }
        </div>
    )
}

export default Chats
