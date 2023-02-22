import React, { useState } from 'react';
import './AddExperience.css';
import { MdOutlineClose } from 'react-icons/md';
import Button from '../../Button';
import axios from "axios";

function AddExperienceModal({ modalOpen, setModalOpen, title, addExperience }) {

    // const [schoolName, setSchoolName] = useState('');
    // const [date, setDate] = useState(''); 
    // const [degree, setDegree] = useState('');

    const [experienceInfo, setExperienceInfo] = useState({
        company: "",
        position: "",
        date: "",
        description: ""
    })

    function handleChange(e) {
        setExperienceInfo((data) => ({ ...data, [e.target.name]: e.target.value}))
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

    const handleAddExperience = () => {
        let experienceObj = {}
        experienceObj["company"] = experienceInfo.company;
        experienceObj["position"] = experienceInfo.position;
        experienceObj["date"] = experienceInfo.date;
        experienceObj["description"] = experienceInfo.description;
        addExperience(experienceObj);
    }


    return (
        <div>
            {modalOpen && (
                <div className="expWrapper">
                <div className="expContainer">
                    <div className="expCloseButton"
                        onClick={() => setModalOpen(false)} >
                        <MdOutlineClose />
                    </div>
                    <form className="expForm">
                        <h1 className="expFormTitle">{title}</h1>

                        <label htmlFor="company">
                            Company
                            <input type="text" id="company" name="company" value={experienceInfo.company} onChange={handleChange}/>
                        </label>

                        <label htmlFor="position">
                            Position
                            <input type="text" id="position" name="position" value={experienceInfo.position} onChange={handleChange}/>
                        </label>


                        <label htmlFor="date">
                            Dates
                            <input type="text" id="date" name="date" value={experienceInfo.date} onChange={handleChange}/>
                        </label>

                        <label htmlFor="description">
                            Description
                            <textarea type="text" id="description" name="description" value={experienceInfo.degree} onChange={handleChange}/>
                        </label>



                        {/* Submit and Cancel Button Container */}
                        <div className="expBtnContainer">
                            <Button type="submit" variant="primary" action={handleAddExperience}>
                                Add experience
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

export default AddExperienceModal;