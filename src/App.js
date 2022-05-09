import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Trivia from './pages/Trivia';
import Settings from './pages/settings';
import FeedBack from './pages/Feedback';
import Ranking from './pages/ranking';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/configs" element={<Settings />} />
          <Route path="/feedback" element={<FeedBack />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
