import { Avatar } from '@material-ui/core'
import React, { useContext, useState } from 'react';
import { Settings, Brightness2, WbSunny } from '@material-ui/icons';
import { auth } from '../../../firebase';
import './Header.scss';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Header() {
    const history = useHistory();
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [loggingOut, setLoggingOut] = useState(false);

    const logOut = () => {
        setTimeout(() => {
            auth.signOut().then(res => {
                setCurrentUser(null);
                setLoggingOut(false);
                history.push('/auth');
            });
        }, 1500)
    }

    return (
        <div className='app-header'>
            <div className="left">
                <Avatar onClick={() => setLoggingOut(true)} src='https://i.guim.co.uk/img/media/82743d3878bccfbf0087bcf0a3a4afdc0721bf49/0_4_1967_1180/master/1967.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=f48a49253e76ca1d85f1bbd40bc7d3ca' alt='Timothee' />
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
            <Dialog
                open={loggingOut}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setLoggingOut(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to log out?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setLoggingOut(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={logOut} color="primary">
                        Log Out
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Header
