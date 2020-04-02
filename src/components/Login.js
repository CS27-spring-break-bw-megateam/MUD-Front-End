import React, { useState } from "react";
import { Link } from "@reach/router";
import serverHandshake from "../utils/serverHandshake";

const Login = ({ navigate }) => {
    const [credentials, setCredentials] = useState({});
    const [error, setError] = useState("");

    const handleInput = event => {
        setCredentials({
        ...credentials,
        [event.target.name]: event.target.value
        });
    };

    const handleLogin = async event => {
        event.preventDefault();
        try {
        console.log(credentials);
        const response = await serverHandshake().post(
            "/api/login",
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
                <h2 className="register-title">Login</h2>
                {error && (
                <p className="error-text">
                    {error}
                </p>
                )}
                <form className="auth-form" onSubmit={handleLogin}>
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
                        htmlFor="password"
                        className="form-label"
                        >
                        Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-input"
                        onChange={handleInput}
                        value={credentials.password || ""}
                        required
                        />
                    </div>

                    <button
                        type="submit"
                        className="form-button"
                    >
                        Login
                    </button>
                </form>

                <div className="already-div">
                    <p>Haven't made an account?</p>
                    <Link to="/register" className="text-blue">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
