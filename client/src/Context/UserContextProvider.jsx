import React, { useEffect, useState } from 'react';
import UserContext from './UserContext.jsx';
import axios from 'axios';
import { server } from '../main.jsx';

const UserContextProvider = ({ children }) => {
    // Check localStorage for authentication state on component mount
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('token');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    });
    
    
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        try {
            await axios.post(`${server}/logout`, {}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            setIsAuthenticated(false);
            // Remove authentication state from localStorage on logout
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const login = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${server}/login`, formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            setIsAuthenticated(true);
            setUser(response.data.user);
            setLoading(false);
            // Store authentication state in localStorage on successful login
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response; // Returning the response from the login function
        } catch (error) {
            setLoading(false);
            console.error('Error logging in:', error);
            throw new Error(error.response.data.message);
        }
    };

    return (
        <UserContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            loading,
            setLoading,
            user,
            setUser,
            logout,
            login,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
