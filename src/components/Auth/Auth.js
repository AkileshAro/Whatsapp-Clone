import React from 'react'
import img from '../../images/google.png';
import './Auth.scss';
import { useHistory } from 'react-router-dom';
import { gProvider, auth } from '../../firebase';

function Auth() {
    const history = useHistory();
    const handleSignIn = () => {
        auth.signInWithPopup(gProvider).then(res => {
            history.push('/');
        }).catch(err => {
            console.log(err.message);
        })
    }

    return (
        <div className='auth-body'>
            <h2>Welcome to whatsapp Rooms</h2>
            <p>Log in to get started</p>
            <img src={img} alt="google" height='75' onClick={handleSignIn} />
        </div>
    )
}

export default Auth;
