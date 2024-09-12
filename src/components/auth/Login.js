import React, { useEffect } from 'react';
import { useState } from 'react';
import './Login.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import PageHeader from '../page-header/PageHeader';
import logo from '../../assets/main-logo.png';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [ emailError,setEmailError] = useState()
    const [passwordError,setPasswordError] = useState()
    // useEffect(() => {
    //     axios.get(`https://backend-final-copy-production.up.railway.app:8080/users?email=${email}`).then(res => { console.log(res.data.user._id) })
    // }, [email])

    const user = {
        email,
        password
    }

    const LoginHandle = async () => {
        console.log("Enter login");
        // const response = await fetch(
        //     "https://backend-final-copy-production.up.railway.app/users/login",
        //     {
        //       method: "POST",
        //       headers: {
        //         "Content-Type":"application/json"
        //       },
        //       body: JSON.stringify({
        //         email:email,
        //         password: password
        //       })
        //     }
        //   );
        //   const output = await response.json();
        //   console.log(response);
        //   console.log(output.token);
        axios.post('https://backend-final-copy-production.up.railway.app/users/login', user).then(function (res) {
            // const output = res.json()
            // console.log(output)
            console.log("Enter then")
            console.log(res.data);
            
            localStorage.setItem('jwt', res.data.token);
            localStorage.setItem("userid", res.data.email) ;
            localStorage.setItem('loggeduser', res.data.email);
            navigate("/");
            window.location.reload()
        })
        .catch(function (error){console.log(error)})
        console.log("After function")
    }


    return (
        <div onClick={()=>{setEmailError();setPasswordError()}}>
            <PageHeader>
                Login
            </PageHeader>
            <div className='login-page'>

                <div className='left'>
                    <div className='logo'>
                        <img src={logo} alt='MyMovies' />
                        <Link to='/'>Your Movies</Link>
                    </div><br></br>
                    <h3>The Movie Database App for your</h3>
                    <p>Please login to continue using our service.</p>
                </div>
            <div className='form-container' >
                    <div className='form'>
                        <h1>Login</h1>
                        <label>Email:</label>
                        <input className='inputforms' type='email' onChange={(e) => {setEmail(e?.target?.value);
                         if(e?.target?.value?.length < 6) {
                            setEmailError("*Email must be at least 6 characters long")
                         }else{
                            setEmailError()
                         }
                         }} placeholder="example@example.com" ></input>
                         <p style={{color:"red",fontSize:"14px"}}>{emailError}</p>
                        <label>Password:</label>
                        <input className='inputforms' type='password' onChange={(e) => {setPassword(e?.target?.value);
                         if(e?.target?.value?.length < 8) {
                            setPasswordError("*Password must be at least 8 characters long")
                         }else{
                            setPasswordError()
                         } }} placeholder="Enter your password"></input>
                        <p style={{color:"red",fontSize:"14px"}}>{passwordError}</p>
                        <p>Not a user? No problem you can <a className='rg-here' href='/register'>register here</a>.</p>
                 {email?.length<6 || password?.length<8 ? null :<button  onClick={LoginHandle} class="login-btn">
                        <i class="bi bi-box-arrow-in-left"></i>
                            Login</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
