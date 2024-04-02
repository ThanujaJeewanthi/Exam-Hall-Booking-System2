﻿import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login_rejister.css'; // Import the CSS file

function Login() {
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    function GetLoginDetails() {
        // Check if loginName and password are not empty
        if (loginName.trim() === '' || password.trim() === '') {
            // Show an error message or handle empty inputs appropriately
            console.error('Login name and password are required.');
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
                navigate("/userDrawingHall");
            })
        }).catch((error) => {
            // Handle any network errors or other exceptions here
            console.error('Error occurred:', error);
        });
    }

    return (
        <div className="bg-gradient-primary">

            <div className="container">

                {/*  <!-- Outer Row --> */}
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* <!-- Nested Row within Card Body --> */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">User Login</h1>
                                            </div>
                                            <div className="user">
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-user"
                                                        value={loginName} onChange={(e) => { setLoginName(e.target.value) }}
                                                        placeholder="Login Name" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                        value={password} onChange={(e) => { setPassword(e.target.value) }}
                                                        placeholder="Password" />
                                                </div>
                                                <div className="form-group">
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
                                                <a href="index.html" className="btn btn-google btn-user btn-block">
                                                    <i className="fab fa-google fa-fw"></i> Login with Google
                                                </a>
                                                <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                                    <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                </a>
                                            </div>
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <a className="small" href="register">Create an Account!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

          
            <script src="vendor/jquery/jquery.min.js"></script>
            <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

         
            <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

        </div>
    )
}

export default Login