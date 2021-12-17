import { Link } from "react-router-dom";
import logo from "/Users/Chidambaram/Full Stack/Example/client/src/images/logo.jpg"
import { Paper, TextField, Button } from '@material-ui/core';
import { useState } from "react";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AlertBox from './AlertBox';
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [userDetails, setUserDetails] = useState({
        displayName: '',
        email: '',
        password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { displayName, email, password } = userDetails;

    const handleOnChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
      };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError(`Passwords don't match`)
        }
       
        const response = await fetch('https://archiveweb.herokuapp.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                displayName,
                email,
                password,
                confirmPassword
            })
        })

        const data = await response.json()

        if(data.status === 'ok') {
            alert('Successfully registered! Login to continue')
            navigate('/login');
        }
        else {
            alert('Register error')
        }

        console.log(data);

        

    }

    return (
        <>
        <div className='header'>
        <div className='logo'>
        <img src= {logo}/>
        <h1>WEB Archive</h1>
        </div>
        </div>
        <form onSubmit={handleRegister}>
        <div className='register'>
            <h2>Create an account</h2>
            
            <TextField color="secondary"
            style={{width:"60%"}}
            required
            value={displayName}
            label="Display Name"
            onChange={handleOnChange}
            name="displayName" />
            
            
            <TextField color="secondary"
            style={{width:"60%"}}
            type= "email"
            required
            value={email}
            label="Email"
            onChange={handleOnChange}
            name="email" />
            
            
            <TextField color="secondary"
            style={{width:"60%"}}
            required
            type='password'
            label="Password"
            value={password}
            name="password"
            onChange={handleOnChange} />
            
            <TextField color="secondary"
            style={{width:"60%"}}
            required
            type='password'
            label="Confirm Password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={({ target }) => setConfirmPassword(target.value)} />
            
            <Button
            style={{margin: "30px"}}
            type="submit"
            variant="contained"
            startIcon={<PersonAddIcon />}
            size="large">
            REGISTER
            </Button>
            
            <p>Already have an account? <Link to ='/login'>Login</Link></p>
            {error && (
          <AlertBox
            message={error}
            severity="error"
            clearError={() => setError(null)}
          />
            )}

        </div>
        </form>

        </>
    )
};

export default Register;