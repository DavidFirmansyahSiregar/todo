import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp } from './auth/signup';
import {SignIn} from './auth/signin';
import {TODO} from './content/todo';
import './App.css';

export const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}>
            <Route path="/todo" element={<TODO />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}
