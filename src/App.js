import React, { useEffect, useState } from 'react';
import CalendarComponent from "./pages/CalendarComponent";
import UserSelector from './pages/UserSelector';
import NoPage from './pages/NoPage';
import { BrowserRouter, Routes, Route   } from "react-router-dom";
import './App.css';
function App() {
  const [currentUser, setCurrentUser ] = useState(localStorage.getItem("currentUser"));

  console.log("current location: ", window.location);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Boss_Scheduler" element={<CalendarComponent currentUser={currentUser}/>}/>
        <Route path="/Boss_Scheduler/userselect" element={<UserSelector currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
        <Route path="*" element ={<NoPage/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

// npm start - runs server 
//ctrl c - terminated batch job
// npm run deploy - uploads the site