import React, { useEffect, useState } from 'react';
import CalendarComponent from "./components/CalendarComponent";
import UserSelector from './components/UserSelector';
import './App.css';
function App() {
  const [currentUser, setCurrentUser ] = useState("");

  useEffect(()=>{
    console.log("currentUser: ", currentUser);
  },[])
  return (
    <>
      {
        currentUser && currentUser.length
        ?
        <UserSelector
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        :
        <CalendarComponent/>

      }
    </>

  );
}

export default App;

// npm start - runs server 
//ctrl c - terminated batch job
// npm run deploy - uploads the site