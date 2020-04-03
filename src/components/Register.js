import React, { useState } from "react";
import { Link } from "@reach/router";
import serverHandshake from "../utils/serverHandshake";
import axios from 'axios';
import NavBar from './NavBar';

const Register = ({ navigate }) => {
    const [credentials, setCredentials] = useState({});
    const [error, setError] = useState("");

    const handleInput = event => {
        setCredentials({
        ...credentials,
        [event.target.name]: event.target.value
        });
    };

    const handleSignup = async event => {
        event.preventDefault();
        axios.post("https://dungeon-of-coconut.herokuapp.com/api/registration/", credentials)
        .then(res => {
            localStorage.setItem("token", res.data['key']);
        })
        .catch(err => {
            console.log(err);
        })
    };

    return (
        <>
        <NavBar/>
        <div className="register-background-div">
            <div className="register-div">
                <h2 className="register-title">Register</h2>
                {error && (
                <p className="error-text">
                    {error}
                </p>
                )}
                <form className="auth-form" onSubmit={handleSignup}>
                    <div className="form-div">
                        <label
                        htmlFor="username"
                        className="form-label"
                        >
                        Username
                        </label>
                        <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-input"
                        onChange={handleInput}
                        value={credentials.username || ""}
                        required
                        />
                    </div>
                    
                    <div className="form-div">
                        <label
                        htmlFor="password1"
                        className="form-label"
                        >
                        Password
                        </label>
                        <input
                        type="password"
                        id="password1"
                        name="password1"
                        className="form-input"
                        onChange={handleInput}
                        value={credentials.password1 || ""}
                        required
                        />
                    </div>

                    <div className="form-div">
                        <label
                        htmlFor="password2"
                        className="form-label"
                        >
                        Confirm Password
                        </label>
                        <input
                        type="password"
                        id="password2"
                        name="password2"
                        className="form-input"
                        onChange={handleInput}
                        value={credentials.password2 || ""}
                        required
                        />
                    </div>

                    <button
                        type="submit"
                        className="form-button"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="already-div">
                    <p>Already a member?</p>
                    <Link to="/" className="text-blue">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
};

export default Register;
