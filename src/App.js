import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MemoizedHomePage from './pages/Homepage';
import Setting from './pages/Setting'
import ProtectedPage from './component/protected';
import io from 'socket.io-client';
import './App.css'
import RegistrationPage from './pages/RegistrationPage';

function App() {

  const socket = io('http://localhost:3000', {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `${localStorage.getItem('jwtToken')}`
        }
      }
    }
  });
  
  return (
    <Router>
      <Routes>
        <Route path="/setting" element={<Setting/>}/>
        <Route path='/login' element={<Login socket={socket} />} />
        <Route path="/" element={<ProtectedPage component={MemoizedHomePage} socket={socket} />} />
        <Route path="/registration" element={<RegistrationPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
