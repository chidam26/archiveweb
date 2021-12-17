import React from 'react'
import jwt from 'jsonwebtoken'
import { useState, useEffect } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import TitleIcon from '@material-ui/icons/Title';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import { TextField, Button } from '@material-ui/core'
// import logo from "/src/images/logo.jpg"
import PostAddIcon from '@material-ui/icons/PostAdd';


function CreateEntry () {
    
    const navigate = useNavigate()
    const [data, setData ] = useState({ title: "", link: "" ,description: ""})
   
    const {title, link, description} = data;

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

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }


    const updateArchive = async (e) => {
        e.preventDefault();
        await fetch('https://archiveweb.herokuapp.com/api/entries/create', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                link,
                description
            })
        })
        .then((res) => {
            setData({title:"", link:"", description: ""})
            console.log(res.data.message);
        })
        .catch((err) => {
            console.log("Error couldn't create Entry");
            console.log(err.message);
        })
        alert("Entry added")
    }

   
  
    return (
        <>
        <div className='header'>
        <div className='logo'>
        {/* <img src= {logo}/> */}
        <h1>WEB Archive</h1>
        </div>
        <Link to ='/login' className='headerlink'>LOGOUT</Link>
        </div>
        <Link to="/entries-display">
                <button type="button" className="button button-back">
                    Back
                </button>
        </Link>
        <form onSubmit={updateArchive}>
        <div className='addentry'>
            <h2>Add a new entry</h2>
            
            <div style={{display: "flex"}}>
            <TitleIcon style={{marginRight: "15px", marginTop: "18px"}}/>
            <TextField
            color="secondary"
            required
            label="Title"
            value={data.title}
            name="title"
            onChange={handleChange}
            />
            </div>

            <div style={{display: "flex"}}>
            <LinkIcon style={{marginRight: "15px", marginTop: "18px"}}/>
            <TextField
            color="secondary"
            required
            label="Link"
            value={data.link}
            name="link"
            onChange={handleChange}
            />
            </div>


            <div style={{display: "flex"}}>
            <DescriptionIcon style={{marginRight: "15px", marginTop: "18px"}}/>
            <TextField
            color="secondary"
            required
            multiline
            label="Description"
            value={data.description}
            name="description"
            onChange={handleChange}
            />
            </div>

            <Button
            type = "submit"
            variant = "contained"
            startIcon = {<PostAddIcon/>}
            style={{marginTop: "24px"}}
            >
            Add entry
            </Button>


        </div>
        </form>
        )

        </>
    )
}



export default CreateEntry