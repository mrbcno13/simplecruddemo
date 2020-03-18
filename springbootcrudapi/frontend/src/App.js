import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import BookAdminScreen from './views/BookAdminScreen';
import AuthorAdminScreen from './views/AuthorAdminScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="home"></Redirect>} />
            <Route exact path="/home" render={(props) => <BookAdminScreen {...props}></BookAdminScreen>} />
            <Route exact path="/admin" render={(props) => <AuthorAdminScreen {...props}></AuthorAdminScreen>} />
          </Switch>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
