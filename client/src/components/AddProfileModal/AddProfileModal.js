import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../Navbar';
import './AddProfileModal.css';
import { MdOutlineClose } from 'react-icons/md';
import Button from '../Button'
import Axios from "axios";
import { AuthContext } from '../../context/AuthUser';

function AddProfileModal({ modalOpen, setModalOpen, title, addProfile,
    phoneNumber, skills, experience }) {

    const { user, setUser } = useContext(AuthContext)

    const [profileInfo, setProfileInfo] = useState({
        phone_number: "",
        skills: "",
        education: [
            {
            school: "",
            degree: "",
            eduYears: "",
        }
    ], 
        experience: {
            job_title: "",
            company: "",
            years: "", 
            description: "",
        }
    })

    const [education, setEducation] = useState([]);

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         const token = localStorage.getItem('jwtToken')
    //         Axios.defaults.headers.common['Authorization'] = token;
    //         Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/userinfo/auth")
    //         .then((response) => {
    //             if (response.data.loggedIn) {
    //                 setUser(response.data);
    //                 console.log(response.data);

    //                 Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/profile/" + response.data.userId);
    //                 .then((response) => e{

    //                 })
    //             }
    //         })
    //     }
    // })





    const handleChange = e => {
        let data = { ...profileInfo };
        let name = e.target.name;
        let val = e.target.value;

        if (name == 'phone_number' || name == 'skills') {
            data = { ...data, [name]: val };
        }

        // else if (name == 'school' || name == 'degree' || name == 'eduYears') {
        //     data = { 
        //         ...data,
        //         education: {
        //             ...data.education, 
        //             [name]: val
        //         }
        //     };
        // }

        else if (name == 'school' || name == 'degree' || name == 'eduYears') {
            data = { 
                ...data,
                education: {
                    ...data.education,
                    [name]: val
                }
            };
        }

        // else if (name == 'school' || name == 'degree' || name == 'eduYears') {
        //     data = { 
        //         ...data,
        //         education: [{
        //             ...data.education, 
        //             [
        //                 school: 
        //                 degree: val,
        //                 eduYears: val,
        //             ]
                    
        //         }
        //     };
        // }

        // else if (name == 'school' || name == 'degree' || name == 'eduYears') {
        //     data = { 
        //         ...data,
        //         education: data.education.map((el) =>
        //             el.hasOwnProperty(name)
        //             ? {
        //                 [name] : val
        //             } 
        //             : el
        //         )
        //     };
        // }

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


    // function handleChange(e) {
    //     setProfileInfo((data) => ({ 
    //         ...data, 
    //         [e.target.name]: e.target.value,
    //     }))
    // }

    // function handleChange(e) {
    //     const [section, key] = e.target.name.split(".");

    //     if (key) {
    //         // if we have nested keys to update
    //         setProfileInfo((data) => ({
    //             ...data,
    //             [section]: {
    //                 ...data[section],
    //                 [key]: e.target.value
    //             }
    //         }));
    //     } else {
    //         // if we are updating on the frist level 
    //         setProfileInfo((data) => ({
    //             ...data,
    //             [section]: e.target.value
    //         }))
    //     }
    // }




    const handleAddProfile = () => {

        console.log("profileInfo", profileInfo);
    }

    console.log("profile: ", profileInfo);


    return (
        <div>
            {modalOpen && (
                <div className="addProfileWrapper">
                <div className="addProfileContainer">
                    <div className="addProfileCloseBtn"
                        onClick={() => setModalOpen(false)} >
                        <MdOutlineClose />
                    </div>
                    <form className="addProfileForm">
                        <h1 className="addProfileFormTitle">{title}</h1>

                        <label htmlFor="phone_number">
                            Phone Number
                            <input type="text" id="phone_number" name="phone_number" value={profileInfo.phone_number} onChange={handleChange}/>
                        </label>


                        <label htmlFor="skills">
                            Skills
                            <input type="text" id="skills" name="skills" value={profileInfo.skills} onChange={handleChange}/>
                        </label>

                        {/* Education Form Section */}
                        <h3>Education</h3>
                        <label htmlFor="education_school">
                            School
                            <input type="text" id="education_school" name="school" value={profileInfo.education.school} onChange={handleChange}/>
                        </label>

                        <label htmlFor="education_degree">
                            Degree
                            <input type="text" id="education_degree" name="degree" value={profileInfo.education.degree} onChange={handleChange}/>
                        </label>

                        <label htmlFor="education_years">
                            Years
                            <input type="text" id="education_years" name="eduYears" value={profileInfo.education.years} onChange={handleChange}/>
                        </label>

                        

                        {/* Experience Form Section */}
                        <h3>Experience</h3>
                        <label htmlFor="job_title">
                            Job Title
                            <input type="text" id="exp_job_title" name="job_title" value={profileInfo.experience.job_title} onChange={handleChange}/>
                        </label>

                        <label htmlFor="exp_company">
                            Company
                            <input type="text" id="exp_company" name="company" value={profileInfo.experience.company} onChange={handleChange}/>
                        </label>

                        <label htmlFor="exp_years">
                            Years
                            <input type="text" id="exp_years" name="years" value={profileInfo.experience.years} onChange={handleChange}/>
                        </label>

                        <label htmlFor="exp_description">
                            Description
                            <input type="text" id="exp_description" name="description" value={profileInfo.experience.description} onChange={handleChange}/>
                        </label>



                        {/* Submit and Cancel Button Container */}
                        <div className="profileButtonContainer">
                            <Button type="submit" variant="primary" action={handleAddProfile}>
                                Add Profile
                            </Button>
                            <Button type="button" variant="secondary"
                                action={() => setModalOpen(false)}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            )}
        </div>
    )
}

export default AddProfileModal;