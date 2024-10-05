import React, { useEffect, useState } from 'react';

const GoogleAuth = () => {
    const [auth2, setAuth2] = useState(null);

    useEffect(() => {
        const loadGapi = () => {
            window.gapi.load('auth2', () => {
                const authInstance = window.gapi.auth2.init({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // Use the correct environment variable
                });
                setAuth2(authInstance);
            });
        };

        // Check if gapi is loaded
        if (window.gapi) {
            loadGapi();
        } else {
            console.error('Google API not loaded');
        }
    }, []);

    const handleLogin = () => {
        if (auth2) {
            auth2.signIn().then((user) => {
                const profile = user.getBasicProfile();
                console.log('ID: ' + profile.getId());
                console.log('Name: ' + profile.getName());
                console.log('Email: ' + profile.getEmail());
                // Handle user data here
            }).catch((error) => {
                console.error('Error during sign-in:', error);
            });
        } else {
            console.error('Google API not initialized');
        }
    };

    const handleLogout = () => {
        if (auth2) {
            auth2.signOut().then(() => {
                console.log('User signed out.');
            }).catch((error) => {
                console.error('Error during sign-out: ', error);
            });
        } else {
            console.error('Google API not initialized');
        }
    };

    return (
        <div>
            <h2>Google Authentication</h2>
            <button onClick={handleLogin}>Sign in with Google</button>
            <button onClick={handleLogout}>Sign out</button>
        </div>
    );
};

export default GoogleAuth;
