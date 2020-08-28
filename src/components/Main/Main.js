import React from 'react'
import './Main.scss';
import Sidebar from './Sidebar/Sidebar';

function Main() {
    return (
        <div className='main'>
            <Sidebar />
            <div className="chat-window">
            </div>
        </div>
    )
}

export default Main;
