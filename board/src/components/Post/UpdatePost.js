import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function UpdatePost() {
  const navigation = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState({
    id: location.state.id,
    title: location.state.title,
    ip: location.state.ip,
    contents: location.state.contents,
  });

  const { title, contents } = post;

  const onChange = (event) => {
    const { value, name } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const updatePost = async () => {
    try {
      await axios.get('https://geolocation-db.com/json/').then((res) => {
        post.ip = res.data.IPv4;
      });
      await axios.put(`/api/v1/posts/${post.id}`, post).then(({ data }) => {
        console.log(data.data);
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
