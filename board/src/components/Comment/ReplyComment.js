import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ReplyComment = ({ item, show, setComments, setShow }) => {
  const location = useLocation();
  const [comment, setComment] = useState({
    ip: '',
    contents: '',
    parentCommentId: item.parentCommentId,
    seq: item.seq + 1,
    depth: item.depth + 1,
    isHide: false,
    postId: location.state.post_id,
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

  const createComment = async () => {
    try {
      await axios.get('https://geolocation-db.com/json/').then((res) => {
        comment.ip = res.data.IPv4;
      });
      await axios.post(`/api/v1/comments`, comment).then(({ res }) => {
        alert('등록되었습니다.');
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
        <Button onClick={() => createComment()}>댓글등록</Button>
        <Button onClick={() => handleClose()}>취소</Button>
      </form>
    </Margin>
  );
};

const Margin = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

export default ReplyComment;
