﻿import './login_rejister.css'; // Import the CSS file
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assest/Background1.png'; // Import your background image
import NavBar from "../NavBar/NavBar.js"; // Make sure the path is correct
function Login() {
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    function validateEmail(email) {
        // Regular expression for basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }


    function GetLoginDetails() {
        // Check if loginName and password are not empty
        if (loginName.trim() === '' || password.trim() === '') {
            // Show an error message or handle empty inputs appropriately
       
            alert("Login name and password are required.");
            return;
        }
        if (!validateEmail(loginName)) {
            alert("Please enter a valid email address.");
            return;
        }

        let items = { loginName, password };

        fetch('https://localhost:44418/api/Users/GetLogin', {
            method: "POST", // Changed to POST
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json" // Changed header key to 'Content-Type'
            },
            body: JSON.stringify(items)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp);
                navigate("/selectHallPage");
            })
        }).catch((error) => {
            // Handle any network errors or other exceptions here
            console.error('Error occurred:', error);
        });
    }
    const handleBackClick = () => {
        window.location.href = '/selectHallPage';
    };

    const handleMainClick = () => {
        window.location.href = '/';
    };

    const handleUserClick = () => {
        window.location.href = '/login';
    };
    const handleAdminClick = () => {
        window.location.href = '/adminLogin';
    };
    const handleSignOutClick = () => {
        window.location.href = '/';
    };

    return (

        <div>
            <NavBar

                onBackClick={handleBackClick}
                showBackButton={false}

                onMainClick={handleMainClick}
                onUserClick={handleUserClick}
                showCalBtton={false}
                onAdminClick={handleAdminClick}
                showSignOutButton={false}
                onSignOutClick={false}
                showAdminUser={false} // Hide User and Admin
                showHomeBtton={true}
            />




            <div className="homepage" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="bg-gradient-primary">

                    <div className="container2">

                        {/*  <!-- Outer Row --> */}
                        <div className="row2 justify-content-center">

                            <div className="col-xl-10 col-lg-12 col-md-9">

                                <div className="card o-hidden border-0 shadow-lg my-5">
                                    <div className="card-body p-0">
                                        {/* <!-- Nested Row within Card Body --> */}
                                        <div className="row2">
                                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                            <div className="col-lg-6">
                                                <div className="p-5">
                                                    <div className="text-center2">
                                                        <h1 className="h4 text-gray-900 mb-4">User Login</h1>
                                                    </div>
                                                    <div className="user">
                                                        <div className="form-group">
                                                            <input type="email" className="form-control form-control-user"
                                                                value={loginName} onChange={(e) => { setLoginName(e.target.value) }}
                                                                placeholder="Email" required />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control form-control-user"
                                                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                                                placeholder="Password" required/>
                                                        </div>
                                                        <div className="form-group2">
                                                            <div className="custom-control custom-checkbox small">
                                                                <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                                <label className="custom-control-label">Remember
                                                                    Me</label>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-primary btn-user btn-block" onClick={GetLoginDetails}>
                                                            Login
                                                        </button>
                                                        <hr />
                                                        {/* <a href="index.html" className="btn2 btn-google btn-user2 btn-block">
                                                    <i className="fab fa-google fa-fw"></i> Login with Google
                                                </a>
                                                <a href="index.html" className="btn2 btn-facebook btn-user2 btn-block">
                                                    <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                </a> */}
                                                    </div>
                                                    <hr />
                                                    <div className="text-center2" style={{ color: 'white' }}>
                                                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                                                    </div>
                                                    <div className="text-center2" style={{ color: 'white' }}>
                                                        <a className="small2" href="register">Create an Account!</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Login