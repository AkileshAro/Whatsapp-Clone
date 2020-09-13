import React from 'react';
import './App.scss';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { ChatProvider } from './ChatProvider';
import Auth from './components/Auth/Auth';
import { AuthProvider } from './context/AuthContext';
import Main from './components/Main/Main';
import PrivateRoute from './helper/PrivateRoute';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div className="chat-app">
          <Router>
            <Switch>
              <PrivateRoute exact path='/chats' component={Main} />
              <PrivateRoute path='/chats/:chatId' component={Main} />
              <Route path='/auth' component={Auth} />
              <Redirect to='/auth' from='/' />
            </Switch>
          </Router>
          <ToastContainer position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
        </div>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
