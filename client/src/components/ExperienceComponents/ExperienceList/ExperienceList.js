import React, { useState, useContext } from 'react';
import './ExperienceList.css';
import { MdEdit, MdDelete, MdAddBox, MdAdd } from "react-icons/md";
import AddExperienceModal from '../AddExperience/AddExperience';
import ExperienceCard from '../ExperienceCard/ExperienceCard';  



const ExperienceList = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [experienceList, setExperienceList] = useState([]);

    const addExperience = (experienceObj) => {
        let tempList = experienceList; 
        tempList.push(experienceObj);
        setExperienceList(tempList);

        setModalOpen(false);
    }

    console.log("Experience list: ", experienceList);

    return (
        <>
            <div className="experienceContainer">
                <div className="expHeaderDiv">
                    <h2>Experience</h2>
                    <div className="addBtnContainer">
                        <div className="addButton">
                            <MdAddBox size={25} onClick={() => setModalOpen(true)}/>
                        </div>
                        {/* <div className="editButton">
                            <MdEdit onClick={() => setModalOpen(true)}/>
                        </div>
                        <div className="deleteButton">
                            <MdDelete />
                        </div> */}

                    </div>
                </div>

                <div className="experienceContent">
                    {experienceList.map((experience) => 
                        <ExperienceCard experienceInfo={experience}/>

                        // console.log(educationList);
                        // <div>
                        //     <li>{education.schoolName}</li>
                        //     <li>{education.date}</li>
                        //     <li>{education.degree}</li>
                        // </div>

                    )}

                </div>
                
                {/* <div className="educationContent">
                    <article>
                        <h4>University of School</h4>
                        <small>Bachelor of Science, Computer Science</small>
                        <br/>
                        <small>2011-2015</small>
                    </article>
                </div> */}

                <AddExperienceModal modalOpen={modalOpen} setModalOpen={setModalOpen} title={"Add Experience"} addExperience={addExperience}/>

            </div>
        </>

        
    );
};

export default ExperienceList;