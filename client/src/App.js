import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Register'
import Jobs from './pages/Jobs'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
