import React, { useState, useContext } from 'react';
import { MdEdit, MdDelete, MdAddBox, MdAdd } from "react-icons/md";
import './Education.css';
import EditEducationModal from '../EditEducation/EditEducation';


const Education = ({ education }) => {

    const { school, degree, years } = education;
    const [modalOpen, setModalOpen] = useState(false);

    console.log("education: ", education)
    return (
        <div className="eduCard">
            <div className="eduTextContent">
                <h1></h1>
                <article className="eduText">
                    <h4>{school}</h4>
                    <small>{degree}</small>
                    <br/>
                    <small>{years}</small>
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

            <EditEducationModal modalOpen={modalOpen} setModalOpen={setModalOpen} title={"Edit Education"} />

            
        </div>

    )

}

export default Education;