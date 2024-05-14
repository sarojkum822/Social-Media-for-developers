import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Post = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/showpost`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        });
        setData(response.data.post);
        setUser(response.data.user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        {data.map((post, index) => (
          <div key={index}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}

        {/* Display user information */}
        <div>
          <h3>User Information</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
