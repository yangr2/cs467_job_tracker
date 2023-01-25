import login from '../assets/login.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email || !password){
            alert("Missing field, Please fill out form completely")
        }
        console.log(email,password)
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