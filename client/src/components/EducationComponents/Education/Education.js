import React, { useState, useContext } from 'react';
import { MdEdit, MdDelete, MdAddBox, MdAdd } from "react-icons/md";
import './Education.css';
import EditEducationModal from '../EditEducation/EditEducation';


const Education = ({ educationInfo }) => {

    const { schoolName, date, degree } = educationInfo;
    const [modalOpen, setModalOpen] = useState(false);


    return (
        <div className="eduCard">
            <div className="eduTextContent">
                <h1></h1>
                <article className="eduText">
                    <h4>{schoolName}</h4>
                    <small>{degree}</small>
                    <br/>
                    <small>{date}</small>
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