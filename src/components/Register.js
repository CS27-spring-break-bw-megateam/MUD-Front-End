import React, { useState } from "react";
import { Link } from "@reach/router";
import serverHandshake from "../utils/serverHandshake";

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
        try {
        console.log(credentials);
        const response = await serverHandshake().post(
            "/api/registration",
            credentials
        );
        console.log(response);
        if (response.status === 201) {
            for (const key in response.data) localStorage.setItem(key, response.data[key]);
            navigate("/game");
        } else {
            console.error("Something went wrong;", response);
        }
        } catch (error) {
        // setError(error.response.detail.toLowerCase());
        // setTimeout(() => {
        //     setError("");
        // }, 5000);
        }
    };

    return (
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
    );
};

export default Register;
