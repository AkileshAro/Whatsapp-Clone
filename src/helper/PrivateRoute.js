import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { auth } from '../firebase';

function PrivateRoute({ component: Component, ...rest }) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setIsLoading(false);
            console.log(user);
            console.log(isLoading);
        })
    }, [])
    const currentUser = auth.currentUser;
    return (
        <Route {...rest} render={props =>
            isLoading || currentUser ? <Component {...props} /> : <Redirect to={'/auth'} />
        } />
    )
}

export default PrivateRoute
