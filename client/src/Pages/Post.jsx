import React, { useEffect, useState } from 'react';
import '../Styles/Post.css';
import axios from 'axios';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/showpost`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        });
        setPosts(response.data.post);
        setUser(response.data.user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='content'>
        <section className='section-1'>
          <h1 className='text-2xl font-medium ml-2'>U-code</h1>
          <div className='right-content'>
            <ul>
              <li>Home</li>
              <li>Messages</li>
              <li>Notifications</li>
              <li>Lists</li>
              <li>Communities</li>
              <li>Profile</li>
            </ul>
            <button>Post</button>
          </div>
        </section>

        <section className='section-2'>
          <div className='profile-name'>
            <form className='post-section border-b-[1px] w-full h-44'>
              <textarea name="text" placeholder='Post your Question Here' className='bg-zinc-900 rounded-md p-2 w-full h-32' id=""></textarea>
              <button className='bg-sky-400 h-10 text-3xl'>Post</button>
            </form>
          </div>

          <div className='posts-container'>
            {posts.map((post, index) => (
              <div key={index} className='post'>
                <div className='post-header'>
                  <img src={post.authorAvatar} alt={post.authorName} className='author-avatar' />
                  <div className='author-info'>
                    <p className='author-name'>{post.authorName}</p>
                    <p className='post-date'>{post.date}</p>
                  </div>
                </div>
                <div className='post-content'>
                  <h3 className='post-title'>{post.title}</h3>
                  <p className='post-description'>{post.content}</p>
                </div>
                <div className='post-actions flex'>
                  <button className='action-button'>Like</button>
                  <button className='action-button'>Comment</button>
                  <button className='action-button'>Share</button>
                </div>
              </div>
            ))}
          </div>
        </section>

      
      </div>
    </div>
  );
};

export default Post;
