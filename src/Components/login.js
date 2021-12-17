import { Link } from "react-router-dom";
import Register from "./register";
// import logo from "/src/images/logo.jpg";
import { Paper, TextField, Button } from '@material-ui/core';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const { email, password } = credentials;

    const handleChange = (e) =>{ 
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('https://archiveweb.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
        const data = await response.json()

        

        if(data.user) {
            localStorage.setItem('token', data.user)
            alert('Login successful')
            navigate("/entries-display");
        }
        else {
            alert('Please check your Email and Password')
        }

        console.log(data);
       
    }
    
    return(
    <Paper>
        <form onSubmit={handleLogin}>
    <div className='header'>
        <div className='logo'>
        {/* <img src= {logo}/> */}
        <h1>WEB Archive</h1>
        </div>
        
        <Link to ='/login' className='headerlink'>LOGIN</Link>
    </div>
    <div className='body'>
        <div className='caption'>
        <p>Web Archive is a place where you can save web pages with title and description.
        No more forgetting why you saved a page when you see it later.</p>
        </div>
        <div className='login'>
            <h2>Login to your account</h2>
            <div className='input'>
            
           
            <TextField color="secondary"
            required
            type="email"
            value={email}
            label="Email"
            onChange={handleChange}
            name="email" />
            

            
            
            <TextField  color="secondary"
            required
            type='password'
            label="Password"
            value={password}
            name="password"
            onChange={handleChange}
             />
             
            </div>
            
            <Button
            style={{margin: "30px"}}
            type="submit"
            variant="contained"
            size="large"
            startIcon={<ExitToAppIcon />}
        >
          LOGIN
        </Button>
            <p>Don't have an account? <Link to ='/register'>Register</Link></p>
        </div>

    </div>
    </form>
    </Paper>
    )
}

export default Login;