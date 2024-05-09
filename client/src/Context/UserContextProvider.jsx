import React, { useEffect, useState } from 'react';
import UserContext from './UserContext.jsx';
import axios from 'axios';
import { server } from '../main.jsx';


const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        try {
            const response = await axios.post(`${server}/logout`);
            
            setIsAuthenticated(false); // Assuming setIsAuthenticated is a state setter function
            
        } catch (error) {
            // Handle error if needed
            console.error('Error logging out:', error);
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
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;