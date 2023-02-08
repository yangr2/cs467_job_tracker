import {Link, useNavigate} from 'react-router-dom'
import { useContext , useEffect} from "react";
import { AuthContext } from "../context/AuthUser";
import Axios from 'axios'

const Navbar = () => {
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
      const token = localStorage.getItem('jwtToken')
      Axios.defaults.headers.common['Authorization'] = token;
      Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/userinfo/auth")
      .then((response) => {
          if(response.data.loggedIn) {
              setUser(response.data)
          }
          if(!response.data.loggedIn){
            setUser(null)
          }
      }).catch((error) => {
          console.log(error)
      })
  });

  const username = user?.email

  const handleLogOut = () => {
    alert("Successfully logged out")
    setUser(null)
    localStorage.removeItem('jwtToken')
    navigate('/')
  }

  return (
    <nav className='navBar'>
       
        <h1> Job Tracker</h1>
        <Link to="/">Home</Link>
        
        <Link to="/jobs">Jobs</Link>
        
        {/* If a user is not logged in, display login & register button */}

        {!username && (
        <>
            <Link to="/login"> Login</Link>
           
            <Link to="/register">Sign Up</Link>
        </>
        )}

        {/* If a user is logged in, display email & logout button */}
        {username && (
        <>
            <p>{username}</p>
            <button onClick={handleLogOut}>Logout</button>
        </>)}
        
     </nav>
   
  )
}
export default Navbar