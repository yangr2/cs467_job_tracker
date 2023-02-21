import Navbar from "../components/Navbar";
import { useState , useContext ,useEffect } from 'react';
import Axios from 'axios';
import { AuthContext } from "../context/AuthUser";


const Contacts = () => {
    const {user, setUser} = useContext(AuthContext);

    const [contacts, setContacts] = useState([])

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
        fetchContacts()
    },[])


    return (
        <div id="contacts-page">
            <Navbar />
                <div className="contacts-add-new">
                    <h3> My Contacts </h3>
                    <button className="add-contact-btn"> + Add Contacts</button>
                </div>  
                <table className="contacts-table">
                    <thead>
                        <tr>
                            <th>CONTACT</th>
                            <th>COMPANY</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                            <th>SOCIAL MEDIA</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact._id}>
                                <td>{contact.first_name}</td>
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
                                    <button className="edit-contact-btn"><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button className="delete-contact-btn"><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            <div className="add-new-contact">
                <form className="contact-form">
                    <h3 className="contact-form-title">Add a New Contact</h3>
                    <label>First Name</label>
                    <input type="text"/>
                    <label>Last Name</label>
                    <input type="text"/>
                    <br/>

                    <label>Company</label>
                    <input type="text"/>
                    <br/>

                    <label>Phone</label>
                    <input type="text"/>
                    <label>Email</label>
                    <input type="text"/>
                    <br/>

                    <label>Linkedin</label>
                    <input type="text"/>
                    <label>Twitter</label>
                    <input type="text"/>
                    <br/>

                    <button> ADD CONTACT </button>
                    <button> CANCEL </button>
                </form>
            </div>


        </div>
    );
}
export default Contacts;