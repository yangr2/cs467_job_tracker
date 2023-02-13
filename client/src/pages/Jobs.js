import Navbar from "../components/Navbar"
import { useState } from 'react'

const Jobs = () => {

    // UseStates for modal boxes for Add Job & Edit Modal
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    
    // UseStates for Adding Jobs
    const [jobTitle, setJobTitle] = useState('')
    const [company, setCompany] = useState('')
    const [jobType, setJobType] = useState('')
    const [location, setLocation] = useState('')
    const [dateApplied, setDateApplied] = useState('')
    const [skills, setSkills] = useState('')
    const [status, setStatus] = useState('')

    // UseStates for Editing Jobs
    const [editJobTitle, setEditJobTitle] = useState('')
    const [editCompany, setEditCompany] = useState('')
    const [editJobType, setEditJobType] = useState('')
    const [editLocation, setEditLocation] = useState('')
    const [editDateApplied, setEditDateApplied] = useState('')
    const [editSkills, setEditSkills] = useState('')
    const [editStatus, setEditStatus] = useState('')
    
     // Handle Submit for Add Job Form
     const handleSubmit = (e) => {
      e.preventDefault()
      // Error Handling if fields are missing
      if(!jobTitle || !company || !jobType || !location || !dateApplied || !skills || !status){
          alert("Missing Field, Please fill out all fields")
      }
      console.log(jobTitle, company, jobType, location, dateApplied, skills, status)
    }

     // Handler for Editing Jobs
     const handleEdit = () => {
      setEditModal(true)
     
    }

    // Handler for submitting edited job posts
    const editJobHandler = (e) => {
      e.preventDefault()
      setEditModal(false)

    }

    // Handler for deleting job
    const handleDelete =  (e) => {
      e.preventDefault()
      console.log("Successfully deleted")
    }
    
 
  return (
    <div>
         <Navbar />
         <div className="jobsContainer">    
          <div className="jobsTable">
              <h3> My Jobs </h3>
              <button className="addJobBtn" onClick={() => {setAddModal(true)}}> + Add New Job</button>
              <table>
                <thead>
                <tr>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Job Type</th>
                      <th>Location</th>
                      <th>Date Applied</th>
                      <th>Skills</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                  </tr>

                </thead>
                  
                  <tbody>
                  <tr>
                      <td> Software Engineer</td>
                      <td> ABC Company</td>
                      <td> Full-Time</td>
                      <td>Los Angeles, CA</td>
                      <td>01-01-2023</td>
                      <td>HTML,CSS,JavaScript, Node.js, Express.js</td>
                      <td>APPLIED</td>
                      <td> <button onClick={handleEdit}> EDIT</button> </td>
                      <td> <button onClick={handleDelete}>DELETE</button></td>
                      </tr>


                  </tbody>
                      
              </table>
          </div>

        <div className="addJobModal" style={addModal ? {display: "block"} : {display: "none"}}>
                <button className="cancelModal" onClick={() => {setAddModal(false)}}> X </button>
                <div className="addJobForm">
                    <form className="addJob" onSubmit={handleSubmit}>
                        <h3 className="addJobTitle">Add a New Job</h3>
                        <br/>
                        <label>Job Title</label>
                        <br/>
                        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
                        <br/>

                        <label>Company</label>
                        <br/>
                        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}/>
                        <br/>

                        <label>Job Type</label>
                        <br/>
                        <input type="text" value={jobType} onChange={(e) => setJobType(e.target.value)}/>
                        <br/>

                        <label>Location</label>
                        <br/>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                        <br/>

                        <label>Date Applied</label>
                        <br/>
                        <input type="text" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)}/>
                        <br/>

                        <label>Skills</label>
                        <br/>
                        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)}/>
                        <br/>

                        <label>Status</label>
                        <br/>
                        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>
                        <br/>

                        <button className="createJobBtn" onClick={() => {setAddModal(false)}}> ADD JOB </button>

                    </form>
                </div>
        </div>

        <div className="editJobModal" style={editModal ? {display: "block"} : {display: "none"}}>
                <button className="cancelEditModal" onClick={() => {setEditModal(false)}}> X </button>
                <div className="editJobForm">
                    <form className="editJob" onSubmit={editJobHandler}>
                        <h3 className="editJobTitle">Edit Job</h3>
                        <br/>
                        <label>Job Title</label>
                        <br/>
                        <input type="text" value={editJobTitle} placeholder={editJobTitle} onChange={(e) => setEditJobTitle(e.target.value)}/>
                        <br/>

                        <label>Company</label>
                        <br/>
                        <input type="text" value={editCompany}  placeholder={editCompany} onChange={(e) => setEditCompany(e.target.value)}/>
                        <br/>

                        <label>Job Type</label>
                        <br/>
                        <input type="text" value={editJobType} placeholder={editJobType} onChange={(e) => setEditJobType(e.target.value)}/>
                        <br/>

                        <label>Location</label>
                        <br/>
                        <input type="text" value={editLocation} placeholder={editLocation} onChange={(e) => setEditLocation(e.target.value)}/>
                        <br/>

                        <label>Date Applied</label>
                        <br/>
                        <input type="text" value={editDateApplied} placeholder={editDateApplied} onChange={(e) => setEditDateApplied(e.target.value)}/>
                        <br/>

                        <label>Skills</label>
                        <br/>
                        <input type="text" value={editSkills} placeholder={editSkills} onChange={(e) => setEditSkills(e.target.value)}/>
                        <br/>

                        <label>Status</label>
                        <br/>
                        <input type="text" value={editStatus} placeholder={editSkills} onChange={(e) => setEditStatus(e.target.value)}/>
                        <br/>

                        <button className="editJobBtn"> EDIT JOB </button>

                    </form>
                </div>
        </div>
   </div>
  
    </div>
  )
}
export default Jobs



