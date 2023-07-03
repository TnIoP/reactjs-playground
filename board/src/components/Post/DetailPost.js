import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CreateComment from '../Comment/CreateComment';
import GetComments from '../Comment/GetComments';

const DetailPost = () => {
  const navigation = useNavigate();
  const [post, setPost] = useState({
    title: '',
    ip: '',
    contents: '',
  });
  const [ip, setIp] = useState('');

  const onChange = (event) => {
    const { value } = event.target;
    setIp(value);
  };

  const { id } = useParams();

  const getPost = async () => {
    try {
      await axios.get(`/api/v1/posts/${id}`).then(({ data }) => {
        setPost(data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async () => {
    try {
      await axios.post(`/api/v1/posts/${id}`, { ip }).then(({ data }) => {
        setPost(data);
        alert('삭제되었습니다.');
      });
      navigation('/');
    } catch (err) {
      console.log(err);
      alert('작성자가 아닙니다.');
    }
  };

  const goToEdit = async () => {
    
      
      if (ip !== post.ip) {
        return alert('작성자가 아닙니다.');
      } else {
        navigation('/edit', {
          state: {
            id: post.id,
            title: post.title,
            ip: post.ip,
            contents: post.contents,
          },
        });
      }
    
  };

  const goToList = () => {
    navigation('/');
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Margin>
      <div>
        <label>제목 :</label>
        <label>{post.title}</label>
      </div>
      <div>
        <label>작성자 ip :</label>
        <label>{post.ip}</label>
      </div>
      <div>
        <label>내용 :</label>
        <label>{post.contents}</label>
      </div>
      <div>
        <label>글 생성 시간 :</label>
        <label>{post.createdAt}</label>
      </div>
      <div>
        <label>글 수정 시간 :</label>
        <label>{post.updatedAt}</label>
      </div>
      <span>
        <input
          type="text"
          placeholder="작성자 ip를 입력해주세요."
          name="ip"
          value={ip || ''}
          onChange={onChange}
        />
      </span>
      <Button onClick={goToEdit}>수정</Button>
      <Button onClick={deletePost}>삭제</Button>
      <Button onClick={goToList}>글목록</Button>
      <CreateComment />
      <GetComments />
    </Margin>
  );
};

const Margin = styled.div`
  margin-top: 100px;
  margin-right: 100px;
  margin-bottom: 100px;
  margin-left: 100px;
`;

export default DetailPost;
