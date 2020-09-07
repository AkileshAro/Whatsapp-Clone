import React, { useContext, useState } from 'react';
import img from '../../images/google.png';
import authImg from '../../images/authImg.png'
import './Auth.scss';
import { useHistory, Redirect, Link } from 'react-router-dom';
import { gProvider, auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { Done } from '@material-ui/icons';

function Auth() {
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [authMode, setAuthMode] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    if (currentUser) return <Redirect to={'/chats'} />

    const handleAuth = (method) => {
        if (method === 'google') {
            auth.signInWithPopup(gProvider).then(res => {
                history.push('/chats');
                console.log(res);
            }).catch(err => {
                console.log(err.message);
            })
        } else if (method === 'enp') {
            auth.signInWithEmailAndPassword(email, password).then(res => {
                history.push('/chats');
                setEmail(''); setUsername(''); setPassword('');
                console.log(res);
            }).catch(err => {
                console.log(err.message);
            })
        } else {
            auth.createUserWithEmailAndPassword(email, password).then(res => {
                setAuthMode('login');
                setEmail(''); setUsername(''); setPassword('');
                console.log(res);
            }).catch(err => {
                console.log(err.message);
            })
        }
    }


    return (
        <div className='auth'>
            <div className="left">
                <div className="text">
                    <h1>Welcome to Crooms!</h1>
                    <p>A place to stay connected.</p>
                </div>
                <img src={authImg} alt="" />
            </div>
            <div className="right">
                <div className="top">
                    <h1 style={{ fontSize: "2.5em" }}>Cr</h1>
                </div>
                <div className="form">
                    {authMode === 'login' ?
                        <p style={{ fontSize: "1.8em" }}>Log In to get started.</p> :
                        <p style={{ fontSize: "1.8em" }}>Sign Up to get started.</p>
                    }
                    {authMode === 'signUp' ? <input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.currentTarget.value)} /> : null}
                    <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.currentTarget.value)} />
                    <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.currentTarget.value)} />
                    {
                        authMode === 'login' ?
                            <div className="google" onClick={() => handleAuth('google')}>
                                <p style={{ marginRight: '0.5em', fontSize: "1.3em", fontWeight: '300' }}>Or just use google </p>
                                <img src={img} alt="" height='18' />
                            </div> : null
                    }
                    <div className="submit">
                        {authMode === 'login' ?
                            <Done className='sub-btn' onClick={() => handleAuth('enp')} />
                            :
                            <Done className='sub-btn' onClick={() => handleAuth('eunp')} />
                        }
                    </div>

                    {
                        authMode === 'login' ?
                            <p style={{ textAlign: "center", margin: "3em 0", fontSize: '1.4em', fontWeight: '300' }}>New here?
                            <span style={{ textDecoration: 'underline', cursor: "pointer" }} onClick={() => setAuthMode("signUp")}> Sign Up.</span></p>
                            :
                            <p style={{ textAlign: "center", margin: "3em 0", fontSize: '1.4em', fontWeight: '300' }}>Have an account?
                            <span style={{ textDecoration: 'underline', cursor: "pointer" }} onClick={() => setAuthMode("login")} > Sign In.</span></p>
                    }
                </div>
            </div>
        </div>

    )
}

export default Auth;
