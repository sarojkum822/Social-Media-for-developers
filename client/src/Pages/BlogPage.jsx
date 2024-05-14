import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BlogServer } from '../main';

const BlogPage = () => {
  const [showBlog, setBlog] = useState([]);
  const [containerHeight, setContainerHeight] = useState('auto');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BlogServer}/showblog`);
        setBlog(response.data.blogs);
        console.log(response.data);
      } catch (error) {
        toast.error("Cannot Get Blogs");
      }
    };

    fetchBlog();
    
    // Adjust container height on window resize
    const handleResize = () => {
      const height = window.innerHeight - 64; // Subtract any header/navbar height
      setContainerHeight(`${height}px`);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial height

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex justify-between h-screen">
      <div className="w-4/5 h-full pt-20">
        <div>
          <h1>hey there</h1>
        </div>
      </div>
      <div className="w-1/5 bg-gray-100 overflow-y-auto">
        {/* Blog posts */}
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap justify-end">
            {showBlog && showBlog.map((user, index) => (
              <div className="blog-post" key={user._id}>
                {user.blogs.map((blog) => (
                  <div className="max-w-sm rounded overflow-hidden shadow-lg m-2" key={blog._id}>
                    <img className="w-full" src={blog.image} alt="Blog" />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{blog.title}</div>
                      <p className="text-gray-700 text-base">{blog.description}</p>
                      <p className="text-gray-700 text-base">{blog.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
