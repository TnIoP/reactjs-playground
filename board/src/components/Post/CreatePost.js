import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function CreatePost() {
  const [post, setPost] = useState({
    title: '',
    ip: '',
    contents: '',
  });
  const { title, ip, contents } = post;
  const getIp = async () => {
    axios.get('https://geolocation-db.com/json/').then((res) => {
      console.log('data : ', res);
    });
  };
  const savePost = async () => {
    await axios.get('api/v1/posts').then(({ data }) => {
      setPost(data);
    });
  };
  return (
    <Margin>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control value={title} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={3} value={contents} />
        </Form.Group>
      </Form>
      <Link to={'/'}>
        <Button>등록</Button>
      </Link>
      <Link to={'/'}>
        <Button>글목록</Button>
      </Link>
    </Margin>
  );
}

const Margin = styled.div`
  margin-top: 100px;
  margin-right: 100px;
  margin-bottom: 100px;
  margin-left: 100px;
`;

export default CreatePost;
