import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CreatePost() {
  const navigation = useNavigate();
  const [post, setPost] = useState({
    title: '',
    ip: '',
    contents: '',
  });
  const { title, contents } = post;

  const onChange = (event) => {
    const { value, name } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const savePost = async () => {
    await axios.get('https://geolocation-db.com/json/').then((res) => {
      post.ip = res.data.IPv4;
    });
    await axios.post('api/v1/posts', post).then(({ res }) => {
      alert('등록되었습니다.');
    });
    navigation('/');
  };

  const backToList = () => {
    navigation('/');
  };

  return (
    <Margin>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control name="title" value={title || ''} onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="contents"
            value={contents || ''}
            onChange={onChange}
          />
        </Form.Group>
      </Form>
      <Button onClick={savePost}>등록</Button>
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

export default CreatePost;
