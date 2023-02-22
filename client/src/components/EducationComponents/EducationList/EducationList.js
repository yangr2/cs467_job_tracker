import React, { useState, useContext } from 'react';
import './EducationList.css';
import { MdEdit, MdDelete, MdAddBox, MdAdd } from "react-icons/md";
import AddEducationModal from '../AddEducation/AddEducation';
import Education from '../Education/Education';



const EducationList = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [educationList, setEducationList] = useState([]);

    const addEducation = (educationObj) => {
        let tempList = educationList; 
        tempList.push(educationObj);
        setEducationList(tempList);

        setModalOpen(false);
    }

    console.log("Education list: ", educationList);

    return (
        <>
            <div className="educationContainer">
                <div className="headerDiv">
                    <h2>Education</h2>
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

                <div className="educationContent">
                    {educationList.map((education) => 
                        <Education educationInfo={education}/>

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

                <AddEducationModal modalOpen={modalOpen} setModalOpen={setModalOpen} title={"Add Education"} addEducation={addEducation}/>

            </div>
        </>

        
    );
};

export default EducationList;