import React from 'react';
import './App.scss';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { ChatProvider } from './ChatProvider';
import Auth from './components/Auth/Auth';
import { AuthProvider } from './context/AuthContext';
import Chats from './components/Main/Chats/Chats';
import PrivateRoute from './helper/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div className="App">
          <div className="whatsapp">
            <Router>
              <Switch>
                <PrivateRoute exact path='/chats' component={Chats} />
                <PrivateRoute path='/chats/:chatId' component={Chats} />
                <Route path='/auth' component={Auth} />
                <Redirect to='/auth' from='/' />
              </Switch>
            </Router>
          </div>
        </div>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
