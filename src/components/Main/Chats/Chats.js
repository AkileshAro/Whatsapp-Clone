import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Chats.scss';
import { db } from '../../../firebase';
import { SentimentSatisfiedAlt } from '@material-ui/icons';
import { useParams } from 'react-router-dom'

function Chats() {
    const [chat, setChat] = useState('');
    const [messages, setMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState('');
    const { chatId } = useParams();

    useEffect(() => {
        if (chatId) {
            db.collection('chats').doc(chatId).onSnapshot(snap => setChat(snap.data().name));
            db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snap => {
                setMessages(snap.docs.map(doc => {
                    console.log(doc.data());
                    return doc.data()
                }));
            })
        }
    }, [chatId])

    const addMessage = (e) => {
        e.preventDefault();
        if (inputMsg) {
            db.collection('chats').doc(chatId).collection('messages').add({
                message: inputMsg,
                name: "Akilesh",
                timestamp: new Date()
            }).then(res => {
                console.log("Message successfully added.");
                setInputMsg('');
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div className='chats'>
            <Sidebar className='sidebar' />
            {
                chatId ? <div className='main-window'>
                    <div className="header">
                        <h4>{chat}</h4>
                    </div>
                    <div className="main-chat">
                        {messages.map((msg, index) => {
                            return (
                                <div className="message-container" key={index}>
                                    <div className="message">
                                        <span className='msg-name'>{msg.name}</span>
                                        <p className='msg-txt'>{msg && msg.message}</p>
                                    </div>
                                    <p className='msg-time'>{new Date(msg.timestamp.toDate()).toLocaleTimeString()}</p>
                                </div>
                            )
                        })}
                    </div>
                    <form className="message-field" onSubmit={(event) => addMessage(event)}>
                        <SentimentSatisfiedAlt style={{ marginRight: '10px' }} />
                        <input type="text" placeholder="Type a message" value={inputMsg} onChange={(e) => setInputMsg(e.currentTarget.value)} />
                    </form>
                </div> :
                    <div className='temporary-window'>
                        <h1>Add a chat</h1>
                    </div>
            }

        </div>
    )
}

export default Chats
