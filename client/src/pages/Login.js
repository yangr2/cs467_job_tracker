import login from '../assets/login.svg'
import { Link } from 'react-router-dom'

const Login = () => {
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
              <form className="login">
                  <label> Email</label>
                  <br/>
                  <input type="email"/>
                  <br/>
                  <label>Password </label>
                  <br/>
                  <input type="password"/>
                  <br/>

                  <button className="loginBtn"> LOGIN</button>
                  <p className="registerRedirect">Don't have an account yet? <Link to="/register"> Sign Up </Link></p>

              </form>
          </div>
  
        </div>
    )
  }
  
  export default Login