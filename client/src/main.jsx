import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './Context/UserContextProvider.jsx'
export const server = 'http://localhost:8080/users';

export const BlogServer = 'http://localhost:8080/blog';

export const PostsServer = 'http://localhost:8080/posts';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>,
)
