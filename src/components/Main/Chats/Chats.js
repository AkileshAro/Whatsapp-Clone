import React, { useEffect, useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar';
import './Chats.scss';
import { db, auth } from '../../../firebase';
import { SentimentSatisfiedAlt, AddCircleOutline, InfoOutlined } from '@material-ui/icons';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import { UsersContext } from '../../../context/UsersContext';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

function Chats() {
    const { users } = useContext(UsersContext);
    const classes = useStyles();
    const { chatId } = useParams();
    const history = useHistory();
    const [chat, setChat] = useState('');
    const [messages, setMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState('');
    const [chatMembers, setChatMembers] = useState([]);
    const [addChatMembersFlag, setAddChatMembersFlag] = useState(false);
    const [chatInfoFlag, setChatInfoFlag] = useState(false);

    useEffect(() => {
        if (chatId) {
            db.collection('chats').doc(chatId).onSnapshot(snap => {
                if (snap.data()) {
                    setChat(snap.data().name);
                    setChatMembers(snap.data().members);
                    return;
                } else {
                    return history.push('/chats');
                }
            });
            db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snap => {
                setMessages(snap.docs.map(doc => {
                    return doc.data()
                }));
            })
        }
    }, [chatId])

    const addMessage = (e) => {
        e.preventDefault();
        console.log(auth.currentUser);
        if (inputMsg) {
            db.collection('chats').doc(chatId).collection('messages').add({
                message: inputMsg,
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
                timestamp: new Date()
            }).then(res => {
                console.log("Message successfully added.");
                setInputMsg('');
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const chatMembersAddHelper = (member) => {
        if (!chatMembers.includes(member)) {
            setChatMembers(members => [...members, member]);
        }
    }

    const chatMembersDeleteHelper = (selectedMember) => {
        setChatMembers(members => members.filter(member => member != selectedMember));
    }

    const addChatMembers = () => {

    }

    return (
        <div className='chat'>
            {
                chatId ?
                    <div className='main-window'>
                        <div className="chat-header">
                            <div className="left">
                                <Avatar alt='Chat Icon' />
                                <p>{chat}</p>
                            </div>
                            <div className="right">
                                <AddCircleOutline onClick={() => setAddChatMembersFlag(true)} />
                                <InfoOutlined onClick={() => setChatInfoFlag(true)} />
                            </div>
                        </div>
                        <div className='chat-body'>
                            {messages.map((msg, index) => {
                                return (
                                    <div className="message-container" key={index} style={auth.currentUser.email == msg.email ? { display: "flex", flexDirection: "row-reverse" } : null}>
                                        <div className={auth.currentUser.email == msg.email ? "message-self" : "message"}>
                                            <span className='msg-name'>{msg.name}</span>
                                            <p className='msg-txt'>{msg && msg.message}</p>
                                            <p className='msg-time'>{new Date(msg.timestamp.toDate()).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <form className="chat-footer" onSubmit={(event) => addMessage(event)}>
                            <input type="text" placeholder="Type a message" value={inputMsg} onChange={(e) => setInputMsg(e.currentTarget.value)} />
                            <SentimentSatisfiedAlt style={{ marginRight: '10px' }} />
                        </form>
                    </div>
                    :
                    <div className='temporary-window'>
                        <h1>No chat found</h1>
                        <p>Select a chat to get started.</p>
                    </div>
            }

            <Dialog
                open={chatInfoFlag}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setChatInfoFlag(false)}
            >
                <DialogTitle id="alert-dialog-slide-title">{chat}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className='chat-members'>
                            {chatMembers && chatMembers.map(member => <Chip size="small" avatar={<Avatar>M</Avatar>} label="Clickable" />)}
                            {chatMembers.length <= 0 ? <p>No members found</p> : null}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setChatInfoFlag(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={addChatMembersFlag}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setAddChatMembersFlag(false)}
            >
                <DialogTitle id="alert-dialog-slide-title">{"Manage chat members"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className='chat-members'>
                            {chatMembers && chatMembers.map(member => <Chip size="small" avatar={<Avatar>M</Avatar>} label={member} onDelete={() => chatMembersDeleteHelper(member)} />)}
                            {chatMembers.length <= 0 ? <p>No members found</p> : null}
                        </div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="contacts">Members</InputLabel>
                            <Select
                                labelId="contacts"
                                id="contact-inp"
                                onChange={(e) => chatMembersAddHelper(e.target.value)}>
                                {users && users.map(user => <MenuItem value={user.id} key={user.id}>{user.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddChatMembersFlag(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => addChatMembers()} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default Chats
