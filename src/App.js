import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main/Main';
import { ChatProvider } from './ChatProvider';
function App() {
  return (
    <ChatProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Main}></Route>
          </Switch>
        </Router>
      </div>
    </ChatProvider>
  );
}

export default App;
