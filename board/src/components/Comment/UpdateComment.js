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
  const [ip, setIp] = useState('');
  const { contents } = comment;

  const handleClose = () => setShow('');

  const onCommentChange = (event) => {
    const { value, name } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const onChange = (event) => {
    const { value } = event.target;
    setIp(value);
  };

  const updateComment = async () => {
    try {
      if (ip !== comment.ip) {
        return alert('작성자가 아닙니다.');
      } else {
      await axios
        .put(`/api/v1/comments/${comment.id}`, comment)
        .then(({ res }) => {
          alert('수정되었습니다.');
          window.location.replace(`/post/${location.state.post_id}`);
          handleClose();
        });
      }
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
            onChange={onCommentChange}
          />
        </span>
        <span>
        <input
          type="text"
          placeholder="작성자 ip를 입력해주세요."
          name="ip"
          value={ip || ''}
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
