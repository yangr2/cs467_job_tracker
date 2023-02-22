import React from 'react';
import './ExperienceModal.css';
import { MdOutlineClose } from 'react-icons/md';
import Button from './Button';

function ExperienceModal({ modalOpen, setModalOpen }) {
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
                <h1 className="formTitle">Add Task</h1>

                <label htmlFor="school">
                    School
                    <input type="text" id="school"/>
                </label>


                <label htmlFor="title">
                    Title
                    <textarea type="textarea" id="title"/>
                </label>



                {/* Submit and Cancel Button Container */}
                <div className="buttonContainer">
                    <Button type="submit" variant="primary">
                        Add Task
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

export default ExperienceModal