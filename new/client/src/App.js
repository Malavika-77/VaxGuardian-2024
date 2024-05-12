// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Checksche from './checksche';
import Changepass from './changepass';
import Adminupdate from './adminupdate';

function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checksche" element={<Checksche />} />
        <Route path="/changepass" element={<Changepass />} />
        <Route path="/adminupdate" element={<Adminupdate />} />
      </Routes>
    </Router>
  );
}

export default App;