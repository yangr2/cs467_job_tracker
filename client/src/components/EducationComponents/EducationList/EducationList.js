import React, { useState, useContext } from 'react';
import './EducationList.css';
import { MdEdit, MdDelete, MdAddBox, MdAdd } from "react-icons/md";
import AddEducationModal from '../AddEducation/AddEducation';
import Education from '../Education/Education';



const EducationList = (education) => {
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
                </div>

                <div className="educationContent">
                    <Education educationInfo={education}/>
                    <div>
                        <li>{education.school}</li>
                        <li>{education.degree}</li>
                        <li>{education.years}</li>
                    </div>


                    {/* {educationList.map((education) => 
                        <Education educationInfo={education}/>

                        // console.log(educationList);
                        // <div>
                        //     <li>{education.schoolName}</li>
                        //     <li>{education.date}</li>
                        //     <li>{education.degree}</li>
                        // </div>

                    )} */}

                </div>
                


                <AddEducationModal modalOpen={modalOpen} setModalOpen={setModalOpen} title={"Add Education"} addEducation={addEducation}/>

            </div>
        </>

        
    );
};

export default EducationList;