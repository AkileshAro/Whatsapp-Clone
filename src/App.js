import React, { useState } from 'react';
import './App.scss';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { ChatProvider } from './ChatProvider';
import Sidebar from './components/Main/Sidebar/Sidebar';
import MainWindow from './components/Main/MainWindow/MainWindow';
import Auth from './components/Auth/Auth';
import { auth } from './firebase';
function App() {
  const [user, setUser] = useState(false);
  auth.onAuthStateChanged(user => {
    user ? setUser(true) : setUser(false);
  });
  return (
    <ChatProvider>
      <div className="App">
        <div className="whatsapp-container">
          <div className="whatsapp">
            <Router>
              <Switch>
                {!user && <Route path='/'>
                  <div className='auth'>
                    <Auth />
                  </div>
                </Route>}
                {user && <Route path='/' >
                  <Sidebar className='sidebar' />
                  <div className='temporary-window'>
                    <h1>Add a chat</h1>
                  </div>
                </Route>}
                {user && <Route path='/chats/:chatId' >
                  <Sidebar className='sidebar' />
                  <MainWindow className='main-window' />
                </Route>}
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;
