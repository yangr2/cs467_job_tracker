import signUp from '../assets/signUp.svg'
import { Link , useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Axios from 'axios'


const Register = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!name || !email || !password){
            alert("Missing field, Please fill out form completely")
        }
        
        Axios.post(process.env.REACT_APP_API_ADDRESS + "/api/registerUsers/register",{
        name: name,
        email: email,
        password: password,
        }).then((response) => {
            alert("Successfully Created an Account")
            navigate('/login')

        }).catch((error) => {
            alert(JSON.stringify(error.response.data.message))
        })
    }
    
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
              <form className="register" onSubmit={handleSubmit}>
                  <label> Name</label>
                  <br/>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                  <br/>

                  <label> Email</label>
                  <br/>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <br/>

                  <label>Password </label>
                  <br/>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <br/>

                  <button className="registerBtn"> CREATE ACCOUNT</button>
                  <p className="loginRedirect">Already a member? <Link to="/login"> Login </Link></p>

              </form>
          </div>
  
        </div>
    )
  }

  export default Register