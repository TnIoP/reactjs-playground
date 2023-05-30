import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import CreatePost from './components/Post/CreatePost';
import PostDetail from './components/Post/PostDetail';
import UpdatePost from './components/Post/UpdatePost';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path='/post' element={<CreatePost/>} /> */}
      <Route path="/post/:id" element={<PostDetail />} />
      {/* <Route path='/post/modify' element={<UpdatePost/>} /> */}
    </Routes>
  </BrowserRouter>
);
