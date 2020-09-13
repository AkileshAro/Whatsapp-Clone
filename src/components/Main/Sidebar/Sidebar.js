import React, { useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Add } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import { ChatContext } from '../../../ChatProvider';
import { db } from '../../../firebase';
import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Sidebar() {
    const [chats, setChats] = useContext(ChatContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chat, setChat] = useState('');

    const addChat = () => {
        db.collection('chats').add({ name: chat }).then(res => {
            console.log(res);
        }, err => {
            console.log(err);
        })
        setIsModalOpen(false);
        setChats([...chats, { name: chat }]);

    }

    return (
        <div className='sidebar'>
            <div className="chat-list">
                {chats.length > 0 ? chats.map((chat, i) => {
                    return (
                        <Link className='list-item' to={`/chats/${chat.id}`} key={i}>
                            <Avatar alt='Group' style={{ marginRight: "0.5em" }} />
                            <p>{chat.name}</p>
                        </Link>
                    )
                }) :
                    <h3>Loading</h3>
                }
            </div>
            <div className="add-chat">
                <button>
                    <Add />
                    New chat
                </button>
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
