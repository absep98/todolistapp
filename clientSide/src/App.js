import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import About from './components/About'
import Register from './components/Register'
import Home from './components/Home';
import JiraLikeKanban from './components/JiraLikeKanban';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board" element={<JiraLikeKanban />} />
        <Route path="/logout" element={<div>Logout Page</div>} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
