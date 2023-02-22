import Navbar from "../components/Navbar"
import React, { useState , useContext } from 'react'
import Axios from 'axios'
import { AuthContext } from "../context/AuthUser";
import { MdEdit, MdDelete } from "react-icons/md";
import EducationModal from "../components/EducationComponents/AddEducation/AddEducation";
import EducationList from "../components/EducationComponents/EducationList/EducationList"
import ExperienceList from "../components/ExperienceComponents/ExperienceList/ExperienceList";

const Profile = () => {
    const {user} = useContext(AuthContext);
    console.log(user);

    const [eduInput, setEduInput] = useState({
        school: '',
        year: '', 
        description: '',
        // editMode: false
    })

    const [modalOpen, setModalOpen] = useState(false);

    // const [editMode, setEditMode] = useState(false);

    // const changeEditMode = () => setEditMode(editMode => !editMode);

    // const renderEditView = () => {
    //     return <div className="educationContent">
    //         <input 
    //             type="text"
    //             defaultValue={eduInput.description}
    //         />
    //     </div>
    // }

    // const renderDefaultView = () => {
    //     return <div className="educationContent" onDoubleClick={changeEditMode}>
    //         {eduInput.description}
    //     </div>
    // }
    
    return (
        <div className="pageContainer">
            <Navbar />
            <div className="profileContainer">
                <div className="profileTextContainer">   
                    <h3>This is the profile page!</h3>
                </div>
            </div>

            <div className="bodyContainer">
                <div className="firstRowContainer">
                    <div className="contactContainer">
                        <h2>Contact</h2>
                        {/* <div className="contactContent"> */}
                            <small>johnsmith@gmail.com</small><br/>
                            <small>(123)456-7890</small>
                        {/* </div> */}
                    </div>


                    {/* <div className="educationContainer">
                        <div className="headerDiv">
                            <h2>Education</h2>
                            <div className="buttonsContainer">
                                <div className="editButton">
                                    <MdEdit onClick={() => setModalOpen(true)}/>
                                </div>
                                <div className="deleteButton">
                                    <MdDelete />
                                </div>

                            </div>
                        </div> */}
                        
                        {/* {editMode ? renderEditView() : renderDefaultView()} */}

                        {/* <div className="educationContent">
                            <article>
                                <h4>University of School</h4>
                                <small>Bachelor of Science, Computer Science</small>
                                <br/>
                                <small>2011-2015</small>
                            </article>
                        </div>
                    </div> */}

                    <EducationList></EducationList>

                    {/* <EducationModal modalOpen={modalOpen} setModalOpen={setModalOpen} title={"Add Education"}/> */}
                </div>

                <div className="secondRowContainer">
                    <ExperienceList />
                    {/* <div className="expContainer">
                        <h2>Experience</h2>
                        <h4>Job 1</h4>
                        <small>Company ABC</small><br/>
                        <small>Jan 2011-June 2014</small><br/>
                        <small><i>Lorem ipsum blah blah blah dalkfja kjlfjaldf lkjalkdf </i></small>
                    </div> */}
                </div>
                
            </div>

            
        </div>
    )
}
export default Profile



