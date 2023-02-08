import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

const Home = () => {
    return (
      <div className="App">
        <h1>HOME PAGE </h1>
        <Link to="/login"> Login</Link>
        <br></br>
        <Link to="/register">Sign Up</Link>
      </div>
    );
}
export default Home
