import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function UpdatePost() {
  const navigation = useNavigate();
  const location = useLocation();
  const [id, setId] = useState(location.state.id);
  const [title, setTitle] = useState(location.state.title);
  const [ip, setIp] = useState(location.state.ip);
  const [contents, setContents] = useState(location.state.contents);
  const [post, setPost] = useState({
    title: '',
    ip: '',
    contents: '',
  });

  const updatePost = async () => {
    try {
      await axios.put('https://geolocation-db.com/json/').then((res) => {
        post.ip = res.data.IPv4;
      });
      await axios.put(`/api/v1/posts/${id}`, post).then(({ data }) => {
        setPost(data.data);
        alert('수정되었습니다.');
      });
      navigation('/');
    } catch (err) {
      console.log(err);
    }
  };

  const backToList = () => {
    navigation('/');
  };

  return (
    <Margin>
      <div></div>
      <Button onClick={updatePost}>수정</Button>
      <Button onClick={backToList}>글목록</Button>
    </Margin>
  );
}

const Margin = styled.div`
  margin-top: 100px;
  margin-right: 100px;
  margin-bottom: 100px;
  margin-left: 100px;
`;

export default UpdatePost;
