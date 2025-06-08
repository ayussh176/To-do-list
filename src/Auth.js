import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import "./Auth.css"; // We'll create this CSS file next

function Auth() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            // Login logic
            try {
                setError("");
                setLoading(true);
                await login(emailRef.current.value, passwordRef.current.value);
            } catch (err) {
                setError("Failed to log in: " + err.message);
            }
            setLoading(false);
        } else {
            // Signup logic
            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError("Passwords do not match");
            }

            try {
                setError("");
                setLoading(true);
                await signup(emailRef.current.value, passwordRef.current.value);
            } catch (err) {
                setError("Failed to create an account: " + err.message);
            }
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" ref={emailRef} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" ref={passwordRef} required />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Password Confirmation</label>
                            <input type="password" ref={passwordConfirmRef} required />
                        </div>
                    )}
                    <button disabled={loading} type="submit">
                        {isLogin ? "Log In" : "Sign Up"}
                    </button>
                </form>
                <div className="auth-toggle">
                    {isLogin ? "Need an account? " : "Already have an account? "}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Sign Up" : "Log In"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Auth;