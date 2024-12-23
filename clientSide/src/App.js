import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import About from './components/About';
import Register from './components/Register';
import Home from './components/Home';
import JiraLikeKanban from './components/JiraLikeKanban';

function App() {
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/board"
          element={
            isAuthenticated ? (
              <JiraLikeKanban />
            ) : (
              <div>Please login to access the board.</div>
            )
          }
        />
        <Route path="/logout" element={<div>Logout Page</div>} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
