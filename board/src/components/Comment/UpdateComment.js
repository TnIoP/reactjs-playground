import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const UpdateComment = ({ item, show, setComments, setShow }) => {
  const location = useLocation();
  const [comment, setComment] = useState({
    id: item.id,
    ip: item.ip,
    parentCommentId: item.parentCommentId,
    seq: item.seq,
    contents: item.contents,
    isHide: item.isHide,
  });
  const { contents } = comment;

  const handleClose = () => setShow("");

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
        if (userIp !== comment.ip) {
          return alert('작성자가 아닙니다.');
        }
      });
      await axios
        .put(`/api/v1/comments/${comment.id}`, comment)
        .then(({ res }) => {
          alert('수정되었습니다.');
          window.location.replace(`/post/${location.state.post_id}`);
          handleClose();
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Margin>
      <form>
        <span>
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            name="contents"
            value={contents || ''}
            onChange={onChange}
          />
        </span>
        <Button onClick={() => updateComment()}>댓글수정</Button>
        <Button onClick={() => handleClose()}>취소</Button>
      </form>
    </Margin>
  );
};

const Margin = styled.div`
  margin-bottom: 10px;
`;

export default UpdateComment;
