import React, { useState } from 'react';
import './EditEducation.css';
import { MdOutlineClose } from 'react-icons/md';
import Button from '../../Button';
import axios from "axios";

function EditEducationModal({ modalOpen, setModalOpen, title, editEducation }) {

    // const [schoolName, setSchoolName] = useState('');
    // const [date, setDate] = useState(''); 
    // const [degree, setDegree] = useState('');

    const [educationInfo, setEducationInfo] = useState({
        schoolName: "",
        date: "",
        degree: ""
    })

    function handleChange(e) {
        setEducationInfo((data) => ({ ...data, [e.target.name]: e.target.value}))
    }



    // const handleChange = (e) => {
    //     const {name, value} = e.target

    //     if (name === "schoolName") {
    //         setSchoolName(value)
    //     }
    //     else if (name === "date") {
    //         setDate(value)
    //     }
    //     else if (name === "degree") {
    //         setDegree(value)
    //     }
    // }

    const handleEditEducation = () => {
        let educationObj = {}
        educationObj["schoolName"] = educationInfo.schoolName;
        educationObj["date"] = educationInfo.date;
        educationObj["degree"] = educationInfo.degree;

        editEducation(educationObj);


    }


    return (
        <div>
            {modalOpen && (
                <div className="wrapper">
                <div className="container">
                    <div className="closeButton"
                        onClick={() => setModalOpen(false)} >
                        <MdOutlineClose />
                    </div>
                    <form className="form">
                        <h1 className="formTitle">{title}</h1>

                        <label htmlFor="school">
                            School
                            <input type="text" id="school" name="schoolName" value={educationInfo.schoolName} onChange={handleChange}/>
                        </label>


                        <label htmlFor="date_attended">
                            Date Attended
                            <input type="text" id="date_attended" name="date" value={educationInfo.date} onChange={handleChange}/>
                        </label>

                        <label htmlFor="degree">
                            Degree
                            <input type="text" id="degree" name="degree" value={educationInfo.degree} onChange={handleChange}/>
                        </label>



                        {/* Submit and Cancel Button Container */}
                        <div className="buttonContainer">
                            <Button type="submit" variant="primary" action={handleEditEducation}>
                                Edit Education
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

export default EditEducationModal;