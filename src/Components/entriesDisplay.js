import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import UpdateEntry from './updateEntry'
import logo from "/Users/Chidambaram/Full Stack/Example/client/src/images/logo.jpg";

import TitleIcon from '@material-ui/icons/Title';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';



function EntriesCard({data, handleEdit, handleDelete}) {
    const{_id, title, link, description} = data;

    return(
        <li key={_id}>
            <div className="title-description">
                <div><TitleIcon/>
                <h2 style={{outline: "solid 3px", padding: "10px", borderRadius: "8px"}}>{title}</h2>
                </div>
                <LinkIcon/>
                <div className="link">
                <a href={link}>{link}</a>
                </div>
                <div className="description"><DescriptionIcon/>
                <p  style={{border: "1px solid black", height: "200px", padding: "10px", borderRadius: "8px"}}>{description}</p></div>
                
            </div>
            <div className="button-container">
            <button className="button" name={_id} onClick={handleEdit}>
                    Edit
                </button>
                <button className="button" name={_id} onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </li>
    )
}


export default function EntriesDisplay() {

    const [entry,setEntry] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [update, setUpdate] = useState(false);
    
    const navigate = useNavigate()

    useEffect(function() {
        
        fetch("http://localhost:8000/api/entries")
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            setEntry(data)
        })
        .catch((err)=>{
            console.log(err);
        })
        
    }, [update])

    

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = jwt.decode(token)
            if(!user) {
                localStorage.removeItem('token')
                navigate("/login", { replace: true });
            }
        }
    }, [])

    function handleEdit(e) {
        setId(e.target.name);
        setOpen(true);
    }

    function handleUpdate() {
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) {
        fetch(`http://localhost:8000/api/entries/${e.target.name}`,
        {method: 'DELETE'});

        setEntry((data) => {
            return data.filter((entry) => entry._id !== e.target.name);
        });
    }

    function handleClose() {
        setId("");
        setOpen(false);
    }

    return(
        <>
        <div className='header'>
        <div className='logo'>
        <img src= {logo}/>
        <h1>WEB Archive</h1>
        </div>
        <Link to ='/login' className='headerlink'>LOGOUT</Link>
        </div>
        
        <section className="container">
            <Link to="/create-entry" className="button-new">
                <button className="button">ADD A NEW ENTRY</button>
            </Link>
            <section className="contents">
                <div className="saved-entries-title"><h1>Saved Archives</h1></div>
                
                <ul className="list-container">
                    {entry.map((data) => (
                        <EntriesCard
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </section>
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>

                        <UpdateEntry
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            ) : (
                ""
            )}
        </section>
        </>
    );
}