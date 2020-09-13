import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Chats from './Chats/Chats';
import Header from './Header/Header';
import './Main.scss';

function Main() {
    return (
        <div className='app-container'>
            <Header />
            <div className="app-body">
                <Sidebar />
                <Chats />
            </div>
        </div>
    )
}

export default Main
