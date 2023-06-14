import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

function CreateComment() {
  const location = useLocation();
  const [comment, setComment] = useState({
    ip: '',
    contents: '',
    parentCommentId: 0,
    depth: 0,
    isHide: false,
    postId: location.state.post_id,
  });
  const { contents } = comment;

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
        <Button onClick={createComment}>등록</Button>
      </form>
    </Margin>
  );
}

const Margin = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;

export default CreateComment;
