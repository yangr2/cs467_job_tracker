import Navbar from "../components/Navbar"
import React, { useState , useContext, useEffect } from 'react'
import Axios from 'axios'
import { AuthContext } from "../context/AuthUser";
import { MdEdit, MdDelete, MdAddBox, MdOutlineClose } from "react-icons/md";

import Button from "../components/Button";
import EducationModal from "../components/EducationComponents/AddEducation/AddEducation";
import EducationList from "../components/EducationComponents/EducationList/EducationList"
import ExperienceList from "../components/ExperienceComponents/ExperienceList/ExperienceList";

import AddProfileModal from "../components/AddProfileModal/AddProfileModal";
import './Profile.css';
import Jobs from "./Jobs";

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    // console.log(user);

    // UseStates for Add Profile Modal & Edit Profile Modal
    const [addProfileModal, setAddProfileModal] = useState(false);
    const [editProfileModal, setEditProfileModal] = useState(false);

    // UseStates for Adding Profile 
    const [phoneNumber, setPhoneNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [skills, setSkills] = useState('');
    const [education, setEducation] = useState({
        school: '',
        degree: '', 
        education_years: ''
    });
    const [experience, setExperience] = useState({
        job_title: '',
        company: '',
        experience_years: '', 
        description: ''
    });

    // UseStates for Editing Profile
    const [editProfileID, setEditProfileID] = useState('');
    const [editPhoneNumber, setEditPhoneNumber] = useState('');
    const [editWebsite, setEditWebsite] = useState('');
    const [editSkills, setEditSkills] = useState('');
    const [editEducation, setEditEducation] = useState({
        school: '',
        degree: '', 
        education_years: ''
    });
    const [editExperience, setEditExperience] = useState({
        job_title: '',
        company: '',
        experience_years: '', 
        description: ''
    });

    const [profile, setProfile] = useState(null);




    /******* profileInfo state ********/
    // const [profileInfo, setProfileInfo] = useState({
    //     phone_number: "",
    //     skills: "",
    //     education: 
    //         {
    //         school: "",
    //         degree: "",
    //         years: "",
    //     },
    //     experience: {
    //         job_title: "",
    //         company: "",
    //         years: "", 
    //         description: "",
    //     }
    // })



    // Get the profile page 
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('jwtToken')
            Axios.defaults.headers.common['Authorization'] = token;
            Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/userinfo/auth")
            .then((response) => {
                if (response.data.loggedIn) {
                    setUser(response.data)
                    console.log("set user data", user)

                    Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/profile/" + response.data.userId)
                    .then((response) => {
                        setProfile(response.data);
                        console.log("profile response.data", response.data)
                        console.log("set profile: ", profile);

                    }).catch((error) => {
                        console.log(error);
                    })
                }
                if (!response.data.loggedIn) {
                    setUser(null)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        fetchProfile();
    }, [])

    /*
    //Handler to setProfileInfo state 
    const handleChange = e => {
        let data = { ...profileInfo };
        let name = e.target.name;
        let val = e.target.value;

        if (name == 'phone_number' || name == 'skills') {
            data = { ...data, [name]: val };
        }

        else if (name == 'school' || name == 'degree' || name == 'eduYears') {
            data = { 
                ...data,
                education: {
                    ...data.education,
                    [name]: val
                }
            };
        }

        else if (name == 'job_title' || name == 'company' || name == 'years' || name == 'description') {
            data = {
                ...data, 
                experience: {
                    ...data.experience,
                    [name]: val
                }
            }
        }
        setProfileInfo(data);
    }
    */

    
    const handleAddProfile = () => {
        // console.log("profileInfo", profileInfo);
        console.log("phoneNumber: ", phoneNumber);
        console.log("skills: ", skills);
        console.log("education: ", education);
        console.log("experience: ", experience);

    }

    // Handle Submit for Add Profile Form 
    const handleSubmitProfile = async (e) => {
        e.preventDefault(); 

        // Error Handling if fields are missing 
        if (!phoneNumber || !skills || !education || !experience) {
            alert("Missing Field, Please fill out the all of the fields for phone number, skills, education, and experience.")
        } else {
            Axios.post(process.env.REACT_APP_API_ADDRESS + "/api/profile/" + user.userId, {
                phone_number: phoneNumber, 
                skills: skills, 
                education: education, 
                experience: experience,

        }).then((response) => {
            alert("Profile created successfully")
            setPhoneNumber('')
            setSkills('')
            setEducation('')
            setExperience('')

            Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/profile/" + user.userId)
            .then((response) => {
                setProfile(response.data)
                console.log("user profile posted: ", profile)
            }).catch((error) => {
                console.log(error)
            })

        }).catch((error) => {
            alert(JSON.stringify(error.response.data.message))
        })
        }
    }

    // Handler for editing profile (autofill edit profile input fields)
    const handleProfileEdit = (id) => {
        setEditProfileModal(true);
        const editProfile = profile.find(profileID => (profile._id === id));

        if (editProfile) {
            setEditPhoneNumber(editProfile.phone_number)
            setEditSkills(editProfile.skills)
            setEditEducation(editProfile.education)
            setEditExperience(editProfile.experience)
            setEditProfileID(editProfile._id)
        }
    }

    // Print edited profile
    const handlePrintEditProfile = () => {
        // console.log("profileInfo", profileInfo);
        console.log("Edit phoneNumber: ", editPhoneNumber);
        console.log("Edited skills: ", editSkills);
        console.log("Edited education: ", editEducation);
        console.log("Edit experience: ", editExperience);
        console.log("user.userId", user.userId)
        console.log("edit profile id: ", editProfileID)

    }

    // Handler for submitting edited profile
    const editProfileHandler = async (e) => {
        e.preventDefault()
        setEditProfileModal(false)

        // console.log("Items to send: ", editPhoneNumber, editSkills, editEducation, editExperience)
        // console.log({skills: editSkills}),
           
        Axios.put(process.env.REACT_APP_API_ADDRESS + "/api/profile/" + user.userId + "/" + editProfileID, {
            phone_number: editPhoneNumber,
            skills: editSkills,
            education: editEducation,
            experience: editExperience,
        }).then((response) => {
            alert("Profile edited successfully")
            
            // console.log("Issue here! ")
            console.log("check user: ", user)


            Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/profile/" + user.userId)
            .then((response) => {
                setProfile(response.data)
                console.log("user profile edited: ", profile)
            }).catch((error) => {
                console.log(error)
            })

        }).catch((error) => {
            alert(JSON.stringify(error.response.data.message))
        })
    }



    return (
        <div className="pageContainer">
            <Navbar />

            {/* Profile Header */}
            <div className="profileContainer">
                <div className="profileTextContainer">   
                    <h3>This is the profile page!</h3>
                </div>

                <div className="profileBtnContainer">
                    <div className="addProfileBtn">
                        <MdAddBox className="addProfileIcon" size={25} onClick={() => setAddProfileModal(true)}/>
                        <h4 className="addProfileText">Add Profile</h4>
                    </div>
                    <div className="editProfileBtn">
                        { profile && profile[0] ? 
                            <>
                            <MdEdit className="editProfileIcon"onClick={() => handleProfileEdit(profile._id)}/>
                            <h4 className="editProfileText">Edit Profile</h4> 
                            </> :

                            <>
                            <MdEdit className="editProfileIcon"onClick={() => handleProfileEdit()}/>
                            <h4 className="editProfileText">Edit Profile</h4>
                            </>
                        } 
                        

                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bodyContainer">
                <div className="firstRowContainer">
                    <div className="contactContainer">
                        <h2>Contact</h2>
                        {/* <div className="contactContent"> */}
                            <small>Phone number:</small><br/>
                            { profile && profile[0] ?
                                <small>{profile[0].phone_number}</small>
                            : 
                            <small></small>
                            }
                        {/* </div> */}
                    </div>


                    <div className="educationContainer">
                        <div className="headerDiv">
                            <h2>Education</h2>
                        </div>

                        <div className="educationContent">
                            <div>
                                { profile && profile[0] ?
                                    
                                    <div>

                                        <li>{profile[0].education.school}</li>
                                        <li>{profile[0].education.degree}</li>
                                        <li>{profile[0].education.education_years}</li>
                                    </div>

                                :  
                                <div></div>
                                }
                            </div>

                            {/* {education.map((education) => 
                                <Education educationInfo={education}/> */}

                                {/* // console.log(educationList);
                                // <div>
                                //     <li>{education.schoolName}</li>
                                //     <li>{education.date}</li>
                                //     <li>{education.degree}</li>
                                // </div> */}

                            {/* )} */}

                        </div>
                    </div>
                </div>
                

                {/* <EducationList education={profile[0].education}></EducationList> */}

                    {/* <EducationModal modalOpen={modalOpen} setModalOpen={setModalOpen} title={"Add Education"}/> */}

                <div className="secondRowContainer">
                    <div className="experienceContainer">
                        <div className="expHeaderDiv">
                            <h2>Experience</h2>
                        </div>
                        <div className="experienceContent">
                            { profile && profile[0] ?
                                <div className="">
                                    <li>{profile[0].experience.job_title}</li>
                                    <li>{profile[0].experience.company}</li>
                                    <li>{profile[0].experience.experience_years}</li>
                                    <li>{profile[0].experience.description}</li>
                                </div>
                            :  
                            <div></div>
                            }
                        </div>
                   
                    </div>
                
                </div>
        </div>
            

        {/* Add Profile Modal */}

        <div>
            <>
            {addProfileModal && (
                <div className="addProfileWrapper">
                    <div className="addProfileContainer">
                        <div className="addProfileCloseBtn"
                            onClick={() => setAddProfileModal(false)} >
                            <MdOutlineClose />
                        </div>
                        <form className="addProfileForm">
                            <h1 className="addProfileFormTitle">Add Profile</h1>

                            {/* Phone number form section */}
                            <label htmlFor="phone_number">
                                Phone Number
                                <input type="text" id="phone_number" name="phone_number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                            </label>

                            {/* Skills form section */}
                            <label htmlFor="skills">
                                Skills
                                <input type="text" id="skills" name="skills" value={skills} onChange={(e) => setSkills(e.target.value)}/>
                            </label>

                            {/* Education Form Section */}
                            <h3>Education</h3>
                            <label htmlFor="education_school">
                                School
                                <input type="text" id="education_school" name="school" value={education.school} onChange={(e) => setEducation({...education, school: e.target.value})}/>
                            </label>

                            <label htmlFor="education_degree">
                                Degree
                                <input type="text" id="education_degree" name="degree" value={education.degree} onChange={(e) => setEducation({...education, degree: e.target.value})}/>
                            </label>

                            <label htmlFor="education_years">
                                Years
                                <input type="text" id="education_years" name="eduYears" value={education.education_years} onChange={(e) => setEducation({...education, education_years: e.target.value})}/>
                            </label>

                            
                            {/* Experience Form Section */}
                            <h3>Experience</h3>
                            <label htmlFor="job_title">
                                Job Title
                                <input type="text" id="exp_job_title" name="job_title" value={experience.job_title} onChange={(e) => setExperience({...experience, job_title: e.target.value})}/>
                            </label>

                            <label htmlFor="exp_company">
                                Company
                                <input type="text" id="exp_company" name="company" value={experience.company} onChange={(e) => setExperience({...experience, company: e.target.value})}/>
                            </label>

                            <label htmlFor="exp_years">
                                Years
                                <input type="text" id="exp_years" name="years" value={experience.experience_years} onChange={(e) => setExperience({...experience, experience_years: e.target.value})}/>
                            </label>

                            <label htmlFor="exp_description">
                                Description
                                <input type="text" id="exp_description" name="description" value={experience.description} onChange={(e) => setExperience({...experience, description: e.target.value})}/>
                            </label>


                            {/* Submit and Cancel Button Container */}
                            <div className="profileButtonContainer">
                                <Button type="submit" variant="primary" action={handleSubmitProfile}>
                                    Add Profile
                                </Button>
                                <Button type="button" variant="secondary"
                                    action={() => setAddProfileModal(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
            </>
        </div>

        {/* Edit Profile Modal */}

        <div>
            <>
            {editProfileModal && (
                <div className="editProfileWrapper">
                    <div className="editProfileContainer">
                        <div className="editProfileCloseBtn"
                            onClick={() => setEditProfileModal(false)} >
                            <MdOutlineClose />
                        </div>
                        <form className="editProfileForm">
                            <h1 className="editProfileFormTitle">Edit Profile</h1>

                            {/* Phone number form section */}
                            <label htmlFor="edit_phone_number">
                                Phone Number
                                <input type="text" id="edit_phone_number" name="edit_phone_number" value={editPhoneNumber} placeholder={editPhoneNumber} onChange={(e) => setEditPhoneNumber(e.target.value)}/>
                            </label>

                            {/* Skills form section */}
                            <label htmlFor="edit_skills">
                                Skills
                                <input type="text" id="edit_skills" name="edit_skills" value={editSkills} placeholder={editSkills} onChange={(e) => setEditSkills(e.target.value)}/>
                            </label>

                            {/* Education Form Section */}
                            <h3>Education</h3>
                            <label htmlFor="edit_education_school">
                                School
                                <input type="text" id="edit_education_school" name="edit_school" value={editEducation.school} onChange={(e) => setEditEducation({...editEducation, school: e.target.value})}/>
                            </label>

                            <label htmlFor="edit_education_degree">
                                Degree
                                <input type="text" id="edit_education_degree" name="edit_degree" value={editEducation.degree} onChange={(e) => setEditEducation({...editEducation, degree: e.target.value})}/>
                            </label>

                            <label htmlFor="edit_education_years">
                                Years
                                <input type="text" id="edit_education_years" name="editEduYears" value={editEducation.education_years} onChange={(e) => setEditEducation({...editEducation, education_years: e.target.value})}/>
                            </label>

                            
                            {/* Experience Form Section */}
                            <h3>Experience</h3>
                            <label htmlFor="edit_job_title">
                                Job Title
                                <input type="text" id="edit_exp_job_title" name="edit_job_title" value={editExperience.job_title} onChange={(e) => setEditExperience({...editExperience, job_title: e.target.value})}/>
                            </label>

                            <label htmlFor="edit_exp_company">
                                Company
                                <input type="text" id="edit_exp_company" name="edit_company" value={editExperience.company} onChange={(e) => setEditExperience({...editExperience, company: e.target.value})}/>
                            </label>

                            <label htmlFor="edit_exp_years">
                                Years
                                <input type="text" id="edit_exp_years" name="edit_years" value={editExperience.experience_years} onChange={(e) => setEditExperience({...editExperience, experience_years: e.target.value})}/>
                            </label>

                            <label htmlFor="edit_exp_description">
                                Description
                                <input type="text" id="edit_exp_description" name="edit_description" value={editExperience.description} onChange={(e) => setEditExperience({...editExperience, description: e.target.value})}/>
                            </label>


                            {/* Submit and Cancel Button Container */}
                            <div className="editProfileButtonContainer">
                                {/* <Button type="submit" variant="primary" action={handlePrintEditProfile}> */}
                                <Button type="submit" variant="primary" action={editProfileHandler}>
                                    Edit Profile
                                </Button>
                                <Button type="button" variant="secondary"
                                    action={() => setEditProfileModal(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
            </>
        </div>
        

        

        
        {/* { profile[0] ?
             <AddProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} 
                title={"Add Profile"}
                phoneNumber={phoneNumber}
                skills={skills}
                education={education}
                experience={experience}

            /> : 
            <AddProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} 
                title={"Add Profile"} 
            />
        } */}
        

        </div>
    )
}
export default Profile



