import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

function PostDetail() {
  const [post, setPost] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [ip, setIp] = useState('');
  const { id } = useParams();

  const getPost = async () => {
    try {
      await axios.get(`/api/v1/posts/${id}`).then(({ data }) => {
        console.log(data);
        setPost(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updatePost = async () => {
    try {
      await axios.put(`/api/v1/posts/${id}`).then(({ data }) => {
        console.log(data);
        setPost(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);
  return (
    <Margin>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Comments"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      <Link to={'/'}>
        <Button>수정</Button>
      </Link>
      <Link to={'/'}>
        <Button>글목록</Button>
      </Link>
      <Link to={'/'}>
        <Button>삭제</Button>
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

export default PostDetail;
