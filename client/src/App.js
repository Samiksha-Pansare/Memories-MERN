import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  

  return (
    <GoogleOAuthProvider clientId="999907441735-8942jld4ncvbu08utvetkbc8kjh4nd19.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/auth' exact element={<Auth/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
