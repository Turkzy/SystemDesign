import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                setLoginStatus('success');
                setTimeout(() => {
                    window.location.href = '/Dashboard/LoadingScreen';
                }, 1000);
                
            } else if (response.status === 401) {
                const data = await response.json();
                if (data.message === "Incorrect password") {
                    setLoginStatus('failure_password');
                } else if (data.message === "Username not found") {
                    setLoginStatus('failure_username');
                } else {
                    setLoginStatus('error');
                }
            } else {
                setLoginStatus('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input className="username-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input className="password-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Login</button>
                {loginStatus === 'success' && <p className='success-message'>Login successful! Redirecting...</p>}
                {loginStatus === 'failure_password' && <p className="error-message">Invalid password.</p>}
                {loginStatus === 'failure_username' && <p className="error-message">Invalid username.</p>}
                {loginStatus === 'error' && <p className="error-message">An error occurred. Please try again later.</p>}
            </form>
        </div>
    );
};

export default Login;