import React, { useState, useContext } from 'react'
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ChatContext } from '../../../ChatProvider';
import { db, auth } from '../../../firebase';
import img from '../../../images/placeholder.jpg';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Sidebar() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const history = useHistory();
    const [chats, setChats] = useContext(ChatContext);
    const [chat, setChat] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addChat = () => {
        db.collection('chats').add({ name: chat }).then(res => {
            console.log(res);
        }, err => {
            console.log(err);
        })
        setIsModalOpen(false);
        setChats([...chats, { name: chat }]);

    }

    const logOut = () => {
        auth.signOut().then(() => {
            setCurrentUser(null);
            console.log(currentUser);
            history.push('/auth');
        })
    }

    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <div className="left">
                    <Avatar alt="Akilesh Rao" src="/static/images/avatar/1.jpg" style={{ marginRight: '.4em' }} />
                    <div className="user-info">
                        <h2>Username</h2>
                        <p>Location</p>
                    </div>
                </div>
                <div className="middle">
                    <button onClick={logOut}>out</button>
                </div>
                <div className="right">
                    <Add className='' onClick={() => setIsModalOpen(true)} />
                </div>
            </div>
            <div className="sidebar-chats">
                {chats.length > 0 ? chats.map((chat, i) => {
                    return (
                        <Link to={`/chats/${chat.id}`} key={i}>
                            <div className='list-item'>
                                {chat.img ? <Avatar alt={chat.name} src={chat.img} style={{ marginRight: "0.5em" }} /> : <Avatar alt={chat.name} style={{ marginRight: "0.5em" }} />}
                                <p style={{ margin: "0" }}>{chat.name}</p>
                            </div>
                        </Link>
                    )
                }) :
                    null
                }

            </div>

            {/* ------------------------------------------------ */}
            <Dialog
                open={isModalOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Add a chat"}</DialogTitle>
                <DialogContent style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                    <img src={img} alt="placeholder" height='150' style={{ borderRadius: '100%', marginBottom: "1em" }} />
                    <TextField label="Chat Name" id="standard-size-normal" value={chat} style={{ minWidth: '400px' }} onChange={(event) => setChat(event.currentTarget.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModalOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addChat} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

        </div >



    )
}

export default Sidebar
