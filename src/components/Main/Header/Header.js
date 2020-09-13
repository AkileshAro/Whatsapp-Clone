import { Avatar } from '@material-ui/core'
import React from 'react';
import { Settings, Brightness2, WbSunny } from '@material-ui/icons';
import './Header.scss';

function Header() {
    return (
        <div className='app-header'>
            <div className="left">
                <Avatar src='https://i.guim.co.uk/img/media/82743d3878bccfbf0087bcf0a3a4afdc0721bf49/0_4_1967_1180/master/1967.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=f48a49253e76ca1d85f1bbd40bc7d3ca' alt='Timothee' />
                <p>Username</p>
            </div>
            <div className="middle">
                <span>Croom</span>
            </div>
            <div className="right">
                <WbSunny />
                <Brightness2 />
                <Settings />
            </div>
        </div>
    )
}

export default Header
