import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as config from '../../lib/common';

const DeleteComment = ({ item, show, setComments, setShow }) => {
  const location = useLocation();
  const [ip, setIp] = useState('');

  const handleClose = () => setShow('');

  const onChange = (event) => {
    const { value } = event.target;
    setIp(value);
  };

  const deleteComment = async () => {
    try {
      if (item.ip !== ip && ip !== config.MASTER_PW) {
        return alert('작성자가 아닙니다.');
      } else {
        await axios
          .post(`/api/v1/comments/${item.id}`, { ip: item.ip })
          .then(({ data }) => {
            alert('삭제되었습니다.');
            window.location.replace(`/post/${location.state.post_id}`);
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
            placeholder="작성자 ip를 입력해주세요."
            name="ip"
            value={ip || ''}
            onChange={onChange}
          />
        </span>
        <Button onClick={() => deleteComment()}>댓글삭제</Button>
        <Button onClick={() => handleClose()}>취소</Button>
      </form>
    </Margin>
  );
};

const Margin = styled.div`
  margin-bottom: 10px;
`;

export default DeleteComment;
