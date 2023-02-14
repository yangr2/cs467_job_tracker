import login from '../assets/login.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext} from 'react'
import Axios from 'axios'
import { AuthContext } from '../context/AuthUser'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setUser} = useContext(AuthContext)

    useEffect(() => {
        const token = localStorage.getItem('jwtToken')
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/userinfo/auth")
        .then((response) => {
            // Redirect User to jobs page is already logged in
            // Otherwise continue render this page
            if(response.data.loggedIn) {
                setUser(response.data)
                navigate('/jobs');
            }
        }).catch((error) => {
            console.log(error)
        })
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email || !password){
            alert("Missing field, Please fill out form completely")
        }
        Axios.post(process.env.REACT_APP_API_ADDRESS + "/api/loginUsers/login",{
            email: email,
            password: password,
        }).then((response) => {
            setUser(response.data.email)
            localStorage.setItem('jwtToken', response.data.token)
            Axios.defaults.headers.common['Authorization'] = response.data.token
            alert("Successfully logged in")
            navigate('/jobs')
        }).catch((error) => {
            alert(error.response.data.message)
        })
    }

    return (
      <div className="loginContainer">
          <div className="loginDivider">
            <div className='loginDividerContainer'>
                <img src={login} alt='login' className="loginImg"/>
                <h2 className="loginDividerHeading">Welcome Back</h2>
                <p className="loginBlurb">Are you ready for the grind? Let's go get that Job</p>
            </div>
          </div>
  
          <div className="loginForm">
              <h2 className="loginTitle">Login</h2>
              <form className="login" onSubmit={handleSubmit}>
                  <label> Email</label>
                  <br/>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <br/>

                  <label>Password </label>
                  <br/>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <br/>

                  <button className="loginBtn"> LOGIN</button>
                  <p className="registerRedirect">Don't have an account yet? <Link to="/register"> Sign Up </Link></p>

              </form>
          </div>
  
        </div>
    )
  }
  
  export default Login