import Navbar from "../components/Navbar"
import { useState , useContext ,useEffect } from 'react'
import Axios from 'axios'
import { AuthContext } from "../context/AuthUser";

const Jobs = () => {
    const {user, setUser} = useContext(AuthContext)

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
    const [editID, setEditID] = useState('')

    const [jobs, setJobs] = useState([])


    useEffect(() => {
      const fetchJobs = async () => {
        const token = localStorage.getItem('jwtToken')
      Axios.defaults.headers.common['Authorization'] = token;
      Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/userinfo/auth")
      .then((response) => {
          if(response.data.loggedIn) {
              setUser(response.data)
              console.log(response.data)
              Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/jobs/" + response.data.userId)
              .then((response) => {
                setJobs(response.data)
              }).catch((error) => {
                  console.log(error)
              })
          }
          if(!response.data.loggedIn){
            setUser(null)
          }
      }).catch((error) => {
          console.log(error)
      })
      }
      fetchJobs()
    },[])


     // Handle Submit for Add Job Form
     const handleSubmit = async (e) => {
      e.preventDefault()
      
      // Error Handling if fields are missing
      if(!jobTitle || !company || !jobType || !location || !dateApplied || !skills || !status){
          alert("Missing Field, Please fill out all fields")
      }else{
        Axios.post(process.env.REACT_APP_API_ADDRESS + "/api/jobs/" + user.userId ,{
          job_title: jobTitle,
          company: company,
          job_type: jobType,
          location: location,
          application_date: dateApplied,
          skills: skills,
          status: status,
          }).then((response) => {
              alert("Job created successfully")
              setJobTitle('')
              setCompany('')
              setJobType('')
              setLocation('')
              setDateApplied('')
              setSkills('')
              setStatus('')

              Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/jobs/" + user.userId)
              .then((response) => {
                setJobs(response.data)
              }).catch((error) => {
                  console.log(error)
              })

          }).catch((error) => {
            alert(JSON.stringify(error.response.data.message))
          })
      }
    }

     // Handler for Editing Jobs (autofill edit input fields)
     const handleEdit = (id) => {
      setEditModal(true)
      const editJobs = jobs.find(job => (job._id === id))
        if(editJobs){
            setEditJobTitle(editJobs.job_title)
            setEditCompany(editJobs.company)
            setEditLocation(editJobs.location)
            setEditDateApplied(editJobs.application_date)
            setEditSkills(editJobs.skills)
            setEditJobType(editJobs.job_type)
            setEditStatus(editJobs.status)
            setEditID(editJobs._id)
        }
    }

    // Handler for submitting edited job posts
    const editJobHandler = async (e) => {
      e.preventDefault()
      setEditModal(false)

      Axios.put(process.env.REACT_APP_API_ADDRESS + "/api/jobs/" + user.userId + "/" + editID,{
        job_title: editJobTitle,
        company: editCompany,
        job_type: editJobType,
        location: editLocation,
        application_date: editDateApplied,
        skills: editSkills,
        status: editStatus,
        }).then((response) => {
            alert("Job edited successfully")

            Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/jobs/" + user.userId)
            .then((response) => {
              setJobs(response.data)
            }).catch((error) => {
                console.log(error)
            })

        }).catch((error) => {
          alert(JSON.stringify(error.response.data.message))
        })
    }

    // Handler for deleting job
    const handleDelete =  (id) => {
      Axios.delete(process.env.REACT_APP_API_ADDRESS + "/api/jobs/" + user.userId + "/" + id).then((response) => {
            alert(JSON.stringify(response.data.message))

            Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/jobs/" + user.userId)
            .then((response) => {
              setJobs(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
          alert(JSON.stringify(error.response.data.message))
        })
    }
    
  return (
    <div>
         <Navbar />
         <div className="jobsContainer">    
          <div className="jobsTable">
              <h3> My Jobs </h3>
              <button className="addJobBtn" onClick={() => {setAddModal(true)}}> + Add Job</button>
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
                  {jobs.map((job) => (
                      <tr key={job._id}>
                      <td>{job.job_title}</td>
                      <td>{job.company}</td>
                      <td>{job.job_type}</td>
                      <td>{job.location}</td>
                      <td>{job.application_date}</td>
                      <td>{job.skills}</td>
                      <td>{job.status}</td>
                      <td> <button onClick={() => handleEdit(job._id)} className="editJobButton"><i className="fa-solid fa-pen-to-square"></i> </button> </td>
                      <td> <button onClick={() => handleDelete(job._id)} className="deleteJobButton"><i className="fa-solid fa-trash"></i></button></td>
                    </tr>
                  ))}
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



