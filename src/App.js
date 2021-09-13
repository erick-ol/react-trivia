import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/login';
import Trivia from './pages/trivia';
import Settings from './pages/settings';
import FeedBack from './pages/feedback';
import Ranking from './pages/ranking';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ Trivia } />
        <Route path="/configs" component={ Settings } />
        <Route path="/feedback" component={ FeedBack } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
