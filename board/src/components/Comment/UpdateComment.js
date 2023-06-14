import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

function UpdateComment({ item, show, setComments, setShow }) {
  console.log(item);
  const [comment, setComment] = useState({
    id: item.id,
    ip: item.ip,
    contents: item.contents,
    isHide: item.isHide,
  });
  const { contents } = comment;

  const handleClose = () => setShow(false);

  const onChange = (event) => {
    const { value, name } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const updateComment = async () => {
    try {
      await axios.get('https://geolocation-db.com/json/').then((res) => {
        const userIp = res.data.IPv4;
        console.log(userIp);
        if (userIp !== comment.ip) {
            return alert('작성자가 아닙니다.');
          }
      });
      
    //   console.log(comment.ip);
        await axios.put(`/api/v1/comments/${comment.id}`, comment).then(({ res }) => {
          alert('수정되었습니다.');
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Margin>
      <>
        <Form.Control
          show={show.toString()}
          type="text"
          placeholder="Normal text"
          name="contents"
          value={contents || ''}
          onChange={onChange}
        />

        <Button onClick={updateComment}>등록</Button>
        <Button onClick={() => handleClose()}>취소</Button>
      </>
    </Margin>
  );
}

const Margin = styled.div`
  margin-bottom: 10px;
`;

export default UpdateComment;
