import Navbar from "../components/Navbar";
import { useState , useContext ,useEffect } from 'react';
import Axios from 'axios';
import { AuthContext } from "../context/AuthUser";


const Contacts = () => {
    const {user, setUser} = useContext(AuthContext);

    const [contacts, setContacts] = useState([]);

    // UseStates for add and edit popout windows
    const [popOut, setPopOut] = useState(false);

    // UseStates for Adding contact
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [company, setCompany] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [twitter, setTwitter] = useState('')
    const [editID, setEditID] = useState('')

    useEffect(() => {
        const fetchContacts = async () => {
        const token = localStorage.getItem('jwtToken')
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/userinfo/auth")
        .then((response) => {
            if(response.data.loggedIn) {
                setUser(response.data)
                
                Axios.get(process.env.REACT_APP_API_ADDRESS + "/api/contacts/" + response.data.userId)
                .then((response) => {
                    setContacts(response.data)
                }).catch((error) => {
                    console.error(error)
                })
            }
            if(!response.data.loggedIn){
              setUser(null)
            }
        }).catch((error) => {
            console.error(error)
        })
        }
        fetchContacts()
    },[])

    const validatePhoneNumber = (input_str) => {
        const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return re.test(input_str);
    }

    const validateEmail = (input_str) => {
        const re =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(input_str);
    }

    // Handle Submit for Add / Edit Contact Form
    const handlePopOutSubmit = (e) => {
        e.preventDefault();
        // Error Handling if fields are missing
        if(!firstName || !lastName || !company){
            alert("Missing Field, Please fill out all fields")
        }else if (!validatePhoneNumber(phone)){
            alert("Phone number is invalid! Please use a valid US phone number")
        }else if (!validateEmail(email)){
            alert("Email format is invalid!")
        }else{
            const action = editID ? 'put' : 'post'
            axiosActions(action, editID);
        }
    }

    const axiosActions = async (action, id) => {
        let url = process.env.REACT_APP_API_ADDRESS + "/api/contacts/" + user.userId 
        if (action == 'put' || action == 'delete'){
           url +=  "/" + id;
        } 
        const data = {
            first_name: firstName,
            last_name: lastName,
            company: company,
            phone: phone,
            email: email,
            linkedin: linkedin,
            twitter: twitter
        }
        try{
            switch (action) {
            case 'put':
                await Axios.put(url, data)
                alert("Contacts edited successfully")
                axiosActions('get'); // rerender contacts content
                break;
            case 'post':
                await Axios.post(url, data)
                alert("Contacts created successfully")
                axiosActions('get'); // rerender contacts content
                break;
            case 'delete':
                await Axios.delete(url)
                alert("Contacts deleted successfully")
                axiosActions('get'); // rerender contacts content
                break;
            default: //get
                const response = await Axios.get(url);
                setContacts(response.data)
            }
        } catch (e) {
            console.error(e)
        }
        
        setPopOut(false);
        resetStates();
    }

    // Handler for pop out open, set default value
    const handlePopoutOpen = (id) => {
        if(id){
            const editContact = contacts.find(contact => (contact._id === id))
            if(editContact){
                setFirstName(editContact.first_name)
                setLastName(editContact.last_name)
                setCompany(editContact.company)
                setPhone(editContact.phone)
                setEmail(editContact.email)
                setLinkedin(editContact.linkedin)
                setTwitter(editContact.twitter)
                setEditID(editContact._id)
            }
        }
        setPopOut(true)
    }

    const cancelSubmit = (e) => {
        e.preventDefault();
        setPopOut(false);
        resetStates();
    }

    const resetStates = () => {
        setFirstName('')
        setLastName('')
        setCompany('')
        setPhone('')
        setEmail('')
        setLinkedin('')
        setTwitter('')
        setEditID('')
    }

    return (
        <div id="contacts-page">
            <Navbar />
                <div className="contacts-add-new">
                    <h3> My Contacts </h3>
                    <button className="add-contact-btn" onClick={() => {handlePopoutOpen()}}>+ Add Contacts</button>
                </div>  
                <table className="contacts-table">
                    <thead>
                        <tr>
                            <th>CONTACT</th><th>COMPANY</th><th>PHONE</th>
                            <th>EMAIL</th><th>SOCIAL MEDIA</th><th></th><th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact._id}>
                                <td>{contact.first_name} {contact.last_name}</td>
                                <td>{contact.company}</td>
                                <td>{contact.phone}</td>
                                <td>{contact.email}</td>
                                <td>
                                    <button className="linkedin-btn" onClick={()=> window.open(contact.linkedin ? contact.linkedin : "https://linkedin.com")}>
                                        <i className="fa-brands fa-linkedin"></i>
                                    </button>
                                    <button className="twitter-btn" onClick={()=> window.open(contact.twitter ? contact.twitter : "https://twitter.com")}>
                                        <i className="fa-brands fa-twitter"></i>
                                    </button>
                                </td>
                                <td> 
                                    <button className="edit-contact-btn" onClick={() => handlePopoutOpen(contact._id)}><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button className="delete-contact-btn" onClick={() => axiosActions('delete', contact._id)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            <div className="add-new-contact" style={popOut?{display: "flex"} : {display: "none"}}>
                <form className="contact-form">
                    <h3>{editID ? 'Edit Contact' : 'Add a New Contact'}</h3>
                    <label>First Name</label>
                    <br/>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <br/>
                    <label>Last Name</label>
                    <br/>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    <br/>

                    <label>Company</label>
                    <br/>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}/>
                    <br/>

                    <label>Phone</label>
                    <br/>
                    <input pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    <br/>
                    <label>Email</label>
                    <br/>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <br/>

                    <label>Linkedin</label>
                    <br/>
                    <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}/>
                    <br/>
                    <label>Twitter</label>
                    <br/>
                    <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)}/>
                    <br/>
                    
                    <div className="add-contact-btn-group"> 
                        <button className="submit-add-contact" onClick={handlePopOutSubmit}> SUBMIT </button>
                        <button className="cancel-add-contact" onClick={cancelSubmit}> CANCEL </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Contacts;