import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../Context/UserContext';
import { server } from '../main';

const Profile = () => {
    const { isAuthenticated, user } = useContext(UserContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${server}/profile`,{
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            console.log("Profile details:", response.data.user);
            setProfileData(response.data.user);
            setLoading(false);
        } catch (error) {
            console.log("Error in getting Profile Details", error);
            setLoading(false);
        }
    }

    if (!isAuthenticated) {
        return <div>You need to log in to view your profile.</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex justify-center flex-col item-center text-center'>
            <h2>Profile</h2>
            {profileData && (
                <div className='flex bg-zinc-900 w-full h-screen text-white justify-center  flex-col text-3xl'>
                    <p>Name: {profileData.name}</p>
                    <p>Email: {profileData.email}</p>
                </div>
            )}
        </div>
    );
}

export default Profile;
