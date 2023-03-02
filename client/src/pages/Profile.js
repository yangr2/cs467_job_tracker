import Navbar from "../components/Navbar"
import React, { useState , useContext, useEffect } from 'react'
import Axios from 'axios'
import { AuthContext } from "../context/AuthUser";
import { MdEdit, MdDelete, MdAddBox, MdOutlineClose, MdEmail, MdMailOutline, MdMail, MdPhone, 
    MdSchool, MdWork, MdOutlineFeed, MdLanguage } from "react-icons/md";

import Button from "../components/Button";
import './Profile.css';


const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    // console.log(user);

    // UseStates for Add Profile Modal & Edit Profile Modal
    const [userName, setUserName] = useState('');
    const [addProfileModal, setAddProfileModal] = useState(false);
    const [editProfileModal, setEditProfileModal] = useState(false);

    // UseStates for Adding Profile 
    const [phoneNumber, setPhoneNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
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
    const [editLinkedIn, setEditLinkedIn] = useState('');
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


    // Get the profile page 
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('jwtToken')
            Axios.defaults.headers.common['Authorization'] = token;
            Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/userinfo/auth")
            .then((response) => {
                if (response.data.loggedIn) {
                    console.log("response.data for user: ", response.data)
                    setUser(response.data)
                    setUserName(response.data.userName)
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


    // Handle Submit for Add Profile Form 
    const handleSubmitProfile = async (e) => {
        e.preventDefault(); 

        // Error Handling if fields are missing 
        if (!phoneNumber || !skills || !education || !experience) {
            alert("Missing Field, Please fill out the all of the fields for phone number, skills, education, and experience.")
        } else {
            Axios.post(process.env.REACT_APP_API_ADDRESS + "/api/profile/" + user.userId, {
                phone_number: phoneNumber, 
                website: website,
                linkedIn: linkedIn,
                skills: skills, 
                education: education, 
                experience: experience,

        }).then((response) => {
            alert("Profile created successfully")
            setPhoneNumber('')
            setWebsite('')
            setLinkedIn('')
            setSkills('')
            setEducation('')
            setExperience('')
            setAddProfileModal(false)

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
            setEditWebsite(editProfile.website)
            setEditLinkedIn(editProfile.linkedIn)
            setEditSkills(editProfile.skills)
            setEditEducation(editProfile.education)
            setEditExperience(editProfile.experience)
            setEditProfileID(editProfile._id)
        }
    }

    // Handler for submitting edited profile
    const editProfileHandler = async (e) => {
        e.preventDefault()
        setEditProfileModal(false)
           
        Axios.put(process.env.REACT_APP_API_ADDRESS + "/api/profile/" + user.userId + "/" + editProfileID, {
            phone_number: editPhoneNumber,
            website: editWebsite,
            linkedIn: editLinkedIn,
            skills: editSkills,
            education: editEducation,
            experience: editExperience,
        }).then((response) => {
            alert("Profile edited successfully")
            setEditProfileModal(false)

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
                    <h1>Profile</h1>
                    <div className="usernameText">
                        { userName ? 
                            <div>
                                <h3>{userName}</h3><br/>
                            </div>
                            :
                            <h3></h3>
                        }
                    </div>
                   
                    { user ? 
                        <div className="emailHeader">
                            <div className="emailIconContainer">
                                <MdMailOutline className="headerEmailIcon" />
                            </div>
                            <h5>{user.email}</h5> 
                        </div>
                        :
                        <h5></h5>
                    }
                </div>

                <div className="profileBtnContainer">
                    <div className="addProfileBtn" onClick={() => setAddProfileModal(true)}>
                        <MdAddBox className="addProfileIcon" size={25} onClick={() => setAddProfileModal(true)}/>
                        <h4 className="addProfileText">Add Profile</h4>
                    </div>
                    <div className="editProfileBtnDiv">
                        { profile && profile[0] ? 
                            <div className="editProfileButton" onClick={() => handleProfileEdit(profile._id)}>
                                <MdEdit className="editProfileIcon" onClick={() => handleProfileEdit(profile._id)}/>
                                <h4 className="editProfileText">Edit Profile</h4> 
                            </div> :

                            <div className="editProfileButton" onClick={() => handleProfileEdit()}>
                                <MdEdit className="editProfileIcon" onClick={() => handleProfileEdit()}/>
                                <h4 className="editProfileText">Edit Profile</h4>
                            </div>
                        } 
                    </div>
                </div>
            </div>


            {/* Contact Info */}
            <div className="bodyContainer">
                <div className="firstRowContainer">
                    <div className="contactContainer">
                        <div className="contactHeaderDiv">
                            <h2>Contact</h2>
                        </div>
                        <div className="contactContent">

                            <div className="phoneNumber">
                                <MdPhone className="phoneIcon"/>
                                <h5>Phone number:</h5>
                                { profile && profile[0] ?
                                    <small className="phoneNumberText">{profile[0].phone_number}</small>
                                : 
                                <small></small>
                                }
                            </div>
                            
                            <div className="contactEmail">
                                <div className="contactEmailContent">
                                    <div className="contactEmailContainer">
                                        <MdMailOutline className="contactEmailIcon" />
                                        <h5>Email: </h5>
                                    </div>
                                    { user ?
                                        <small className="contactEmailText">{user.email}</small>
                                    :
                                    <small></small>
                                    }
                                </div>
                           </div>

                           <div className="website">
                                <MdLanguage className="websiteIcon"/>
                                <h5>Website:</h5>
                                { profile && profile[0] ?
                                    <small className="websiteText">{profile[0].website}</small>
                                : 
                                <small></small>
                                }
                            </div>

                            <div className="linkedIn">
                                <MdLanguage className="linkedInIcon"/>
                                <h5>LinkedIn:</h5>
                                { profile && profile[0] ?
                                    <small className="linkedInText">{profile[0].linkedIn}</small>
                                : 
                                <small></small>
                                }
                            </div>
                        </div>
                    </div>


                    <div className="educationContainer">
                        <div className="educationHeaderDiv">
                            <div className="eduHeader">
                                <h2>Education</h2>
                                <MdSchool size={28} className="schoolIcon"/>
                            </div>
                        </div>

                        <div className="educationContent">
                            <div>
                                { profile && profile[0] ?
                                    
                                    <div>
                                        <div className="school">
                                            <h4>School:</h4>
                                            <small>{profile[0].education.school}</small>
                                        </div>

                                        <div className="degree">
                                            <h4>Degree:</h4>
                                            <small>{profile[0].education.degree}</small>
                                        </div>

                                        <div className="educationYears">
                                            <h4>Attended:</h4>
                                            <small>{profile[0].education.education_years}</small>
                                        </div>
                                       
                                    </div>

                                :  
                                <div></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                

                <div className="secondRowContainer">
                    <div className="experienceContainer">
                        <div className="expHeaderDiv">
                            <div className="experienceHeader">
                                <h2>Experience</h2>
                                <MdWork size={28} className="workIcon"/>
                            </div>
                        </div>
                        <div className="experienceContent">
                            { profile && profile[0] ?
                                <div className="">
                                    <div className="jobTitle">
                                        <h4>Job Title: </h4>
                                        <small>{profile[0].experience.job_title}</small>
                                    </div>

                                    <div className="company">
                                        <h4>Company:</h4>
                                        <small>{profile[0].experience.company}</small>
                                    </div>

                                    <div className="experienceYears">
                                        <h4>Dates:</h4>
                                        <small>{profile[0].experience.experience_years}</small>
                                    </div>

                                    <div className="description">
                                        <h4>Description:</h4>
                                        <small>{profile[0].experience.description}</small>
                                    </div>
                                </div>
                            :  
                            <div></div>
                            }
                        </div>
                    </div>
                </div>
                
                {/* Third Row - Skills */}
                <div className="thirdRowContainer">
                    <div className="skillsContainer">
                        <div className="skillsHeaderDiv">
                            <div className="skillsHeader">
                                <h2>Skills</h2>
                                <MdOutlineFeed size={28} className="skillsIcon" />
                            </div>
                        </div>
                        
                        <div className="skillsContent">
                            { profile && profile[0] ? 
                                <div>
                                    <article>{profile[0].skills}</article>
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

                            <h3>Contact Info</h3>
                            {/* Phone number form section */}
                            <label htmlFor="phone_number">
                                Phone Number
                                <input type="text" id="phone_number" name="phone_number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                            </label>

                            {/* Website form section */}
                            <label htmlFor="website">
                                Website
                                <input type="text" id="website" name="website" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                            </label>

                            {/* LinkedIn form section */}
                            <label htmlFor="linkedIn">
                                LinkedIn
                                <input type="text" id="linkedIn" name="linkedIn" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)}/>
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

                            {/* Edit phone number form section */}
                            <label htmlFor="edit_phone_number">
                                Phone Number
                                <input type="text" id="edit_phone_number" name="edit_phone_number" value={editPhoneNumber} placeholder={editPhoneNumber} onChange={(e) => setEditPhoneNumber(e.target.value)}/>
                            </label>

                            {/* Edit Website form section */}
                            <label htmlFor="edit_website">
                                Website
                                <input type="text" id="edit_website" name="edit_website" value={editWebsite} onChange={(e) => setEditWebsite(e.target.value)}/>
                            </label>

                            {/* Edit LinkedIn form section */}
                            <label htmlFor="edit_linkedIn">
                                LinkedIn
                                <input type="text" id="edit_linkedIn" name="edit_linkedIn" value={editLinkedIn} onChange={(e) => setEditLinkedIn(e.target.value)}/>
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

        </div>
    )
}
export default Profile



