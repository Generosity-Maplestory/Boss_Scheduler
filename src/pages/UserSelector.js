import React from 'react';
import { useNavigate  } from "react-router-dom";
import generosity_logo from '../assets/generosity_logo.png';
export default function UserSelector({    
    currentUser,
    setCurrentUser
}){
    const [value, setValue ] = React.useState(currentUser);
    const navigate = useNavigate();

    const [invalid, setInvalid ] = React.useState(false);
    function handleChange(event){
        console.log("event: ", event.target.value);
        setValue(event.target.value);
    }
    function handleUserSet(val){
        if(!val.length){
            setInvalid(true);
            return;
        }

        setCurrentUser(val);
        localStorage.setItem("currentUser", val);
        navigate("/");
    }

    function onKeyPress(event){
        if (event.which === 13 /* Enter */) {
            event.preventDefault();
            handleUserSet(value);
        }
    }
    return(
        <form className="flex flex-col justify-center items-center h-screen w-screen" onKeyDown={onKeyPress}>
            <div className="w-max flex justify-between items-center">
                <img className="w-16" src={generosity_logo}/>
                <div>
                    Enter name for reference
                </div>
            </div>
            <div className="flex items-center border-b border-green-400 py-2 h-max">
                <input 
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                    type="text" 
                    placeholder="Discord Name" 
                    aria-label="Full name"
                    onChange={handleChange}
                    value={value}
                />
                <button 
                    className="flex-shrink-0 bg-green-500 hover:bg-green-400 border-green-400 hover:border-green-400 text-sm border-4 text-white py-1 px-2 rounded" 
                    type="button"
                    onClick={() => handleUserSet(value)}
                >
                    Sign Up
                </button>
            </div>
            {
                invalid && <div className="text-red-400 text-xs font-light">Please enter a name</div>
            }
        </form>
    )
}