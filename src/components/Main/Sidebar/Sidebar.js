import React, { useState, useContext, useEffect } from 'react'
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
import { UsersContext } from '../../../context/UsersContext';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Sidebar.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Sidebar() {
    const classes = useStyles();
    const { users } = useContext(UsersContext);
    const { chats, setChats } = useContext(ChatContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chat, setChat] = useState('');
    const [chatUsers, setChatUsers] = useState([]);

    const addChat = () => {
        db.collection('chats').add({ name: chat, members: chatUsers }).then(res => {
            toast.success("A new chat has been added");
            setTimeout(() => {
                window.location.reload();
            }, 1500)
        }, err => {
            console.log(err);
        })
        setIsModalOpen(false);
        setChats([...chats, { name: chat }]);

    }

    const addUserToChat = (user) => {
        if (!chatUsers.includes(user)) {
            setChatUsers([...chatUsers, user])
        }
    }

    const removeUserFromChat = (selectedUser) => {
        const arr = chatUsers.filter(user => {
            return user != selectedUser;
        })
        setChatUsers(arr);
    }


    return (
        <div className='sidebar'>
            <div className="chat-list">
                {chats.length > 0 ? chats.map((chat, i) => {
                    return (
                        <Link className='list-item' key={i} to={`/chats/${chat.id}`}>
                            <Avatar alt='Group' style={{ marginRight: "0.5em" }} />
                            <p>{chat.name}</p>
                        </Link>
                    )
                }) :
                    <h3>Loading</h3>
                }
            </div>
            <div className="add-chat">
                <button onClick={() => setIsModalOpen(true)}>
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
                <DialogContent className='dialog-form'>
                    <TextField label="Chat Name" id="standard-size-normal" value={chat} style={{ minWidth: '400px' }} onChange={(event) => setChat(event.currentTarget.value)} />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="contacts">Members</InputLabel>
                        <Select
                            labelId="contacts"
                            id="contact-inp"
                            onChange={(e) => addUserToChat(e.target.value)}>
                            {users && users.map(user => <MenuItem value={user.id} key={user.id}>{user.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </DialogContent>
                {
                    chatUsers.length > 0 ?
                        <div className='users-selected' style={{ padding: "0 1.2em" }}>
                            {chatUsers.map(user => <Chip style={{ marginRight: "1em" }}
                                avatar={<Avatar>M</Avatar>}
                                label={user}
                                clickable
                                color="primary"
                                onDelete={() => removeUserFromChat(user)}
                            />)}
                        </div> : null
                }
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
