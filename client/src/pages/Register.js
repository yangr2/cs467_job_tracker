import signUp from '../assets/signUp.svg'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
      <div className="registerContainer">
          <div className="registerDivider">
            <div className='registerDividerContainer'>
                <img src={signUp} alt='sign up' className="registerImg"/>
                <h2 className="registerDividerHeading">Track your Jobs</h2>
                <p className="registerBlurb">Stay organized. Don't miss out and get that job</p>
            </div>
          </div>
  
          <div className="registerForm">
              <h2 className="registerTitle">Sign Up</h2>
              <form className="register">
                  <label> Name</label>
                  <br/>
                  <input type="text"/>
                  <br/>
                  <label> Email</label>
                  <br/>
                  <input type="email"/>
                  <br/>
                  <label>Password </label>
                  <br/>
                  <input type="password"/>
                  <br/>

                  <button className="registerBtn"> CREATE ACCOUNT</button>
                  <p className="loginRedirect">Already a member? <Link to="/login"> Login </Link></p>

              </form>
          </div>
  
        </div>
    )
  }
  
  export default Register