import React, { useContext } from 'react'
import img from '../../images/google.png';
import './Auth.scss';
import { useHistory, Redirect } from 'react-router-dom';
import { gProvider, auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';

function Auth() {
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);

    if (currentUser) return <Redirect to={'/chats'} />

    const handleSignIn = () => {
        auth.signInWithPopup(gProvider).then(res => {
            history.push('/chats');
        }).catch(err => {
            console.log(err.message);
        })
    }

    return (
        <div>
            <div className='auth-body'>
                <h2>Welcome to whatsapp Rooms</h2>
                <p>Log in to get started</p>
                <img src={img} alt="google" height='75' onClick={handleSignIn} />
            </div>
        </div>

    )
}

export default Auth;
