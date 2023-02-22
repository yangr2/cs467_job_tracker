import React, { useState, useContext } from 'react';
import { MdEdit, MdDelete, MdAddBox, MdAdd } from "react-icons/md";
import './ExperienceCard.css';
// import EditExperienceModal from '../EditExperience/EditExpeerience';


const ExperienceCard = ({ experienceInfo }) => {

    const { company, position, date, description } = experienceInfo;
    const [modalOpen, setModalOpen] = useState(false);


    return (
        <div className="experienceCard">
            <div className="expTextContent">
                <h1></h1>
                <article className="expText">
                    <h4>{company}</h4>
                    <small>{position}</small><br/>
                    <small>{date}</small><br/>
                    <br/>
                    <small><i>{description}</i></small>
                </article>
            </div>
            <div className="buttonsContainer">
                <div className="editButton">
                    <MdEdit onClick={() => setModalOpen(true)}/>
                </div>
                <div className="deleteButton">
                    <MdDelete />
                </div>
            </div>

            {/* <EditExperienceModal modalOpen={modalOpen} setModalOpen={setModalOpen} title={"Edit Experience"} /> */}

            
        </div>

    )

}

export default ExperienceCard;