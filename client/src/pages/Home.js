import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

const Home = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
      fetch(process.env.REACT_APP_API_ADDRESS + "/api/positions/test")  
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }, []);
  
    return (
      <div className="App">
        <h1>HOME PAGE </h1>
        <h1>{message}</h1>
        <Link to="/login"> Login</Link>
        <br></br>
        <Link to="/register">Sign Up</Link>
      </div>
    );
}
export default Home
