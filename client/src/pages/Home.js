import Navbar from "../components/Navbar";
import home from '../assets/home.png'
import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div>
         <Navbar/>
         <div className="homeContainer">
            <div className="homeTextContainer">
              <h1>Organize your job <br/> applications. <br/> Never lose track again.</h1>
              
              <p> Too many job applications to count? Optimize and organize <br/> your job application to stay on top of your job hunt. </p>

              <Link to="/register"> <button className="homeBtn"> SIGN UP FOR FREE</button> </Link>
            </div>

            <div className="homeImgContainer">
              <img src={home} alt='home' className="homeImg"/>
            </div>

        </div>
      </div>
    );
}
export default Home
