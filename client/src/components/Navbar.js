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
  },[]);

  const username = user?.email

  const handleLogOut = () => {
    alert("Successfully logged out")
    setUser(null)
    localStorage.removeItem('jwtToken')
    navigate('/')
  }

  return (
    <nav className='navBar'>

      <div className="navContainer">
        <div className="navLogo">
        <Link to="/"> <h1> Job Tracker</h1> </Link>
        </div>
        <div className="navMenuContainer">
        <ul className="navMenu">
         
          {username && (
            <>
             <li className="navItem">
              <Link className="homeButton" to="/">HOME</Link>
             </li>

             <li className="navItem">
              <Link className="jobButton"to="/jobs">JOBS</Link>
             </li>

             <li className="navItem">
              <Link className="profileButton" to="/profile">PROFILE</Link>
            </li>
            
             <li className="navItem">
              <Link className="contactButton"to="/contacts">CONTACTS</Link>
             </li>
            </>
          )}
         
          {/* If a user is not logged in, display login & register button */}
          {!username && (
          <>
              <li className="navItem">
              <div className="loginButtonContainer">
              <Link className="loginButton" to="/login"> LOGIN</Link>
              </div>
              </li>
              <li className="navItem">
              <div className="registerButtonContainer">
              <Link className="registerButton" to="/register">REGISTER</Link>
              </div>
              </li>
          </>
          )}

          {/* If a user is logged in, display email & logout button */}
          {username && (
          <>
              <li className="navItem">
              <p>{username}</p>
              </li>
              <li className="navItem">
              <div className="buttonContainer">
              <button className="logoutButton" onClick={handleLogOut}>SIGN OUT</button>
              </div>
              </li>
          </>)}
        </ul>
        </div>
        </div>
     </nav>
   
  )
}
export default Navbar