import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import UpdateComment from './UpdateComment';

function GetComments() {
  const location = useLocation();

  const [comments, setComments] = useState([]);
  const [userIp, setUserIp] = useState('');

  const getComments = async () => {
    try {
      await axios
        .get(`/api/v1/comments/${location.state.post_id}`)
        .then(({ data }) => {
          setComments(data.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (id, ip) => {
    try {
      if (userIp !== ip) {
        return alert('작성자가 아닙니다.');
      }
      const comment = {
        ip,
      };
      await axios.post(`/api/v1/comments/${id}`, comment).then(({ data }) => {
        alert('삭제되었습니다.');
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getUserIp = async () => {
    try {
      await axios.get('https://geolocation-db.com/json/').then((res) => {
        setUserIp(res.data.IPv4);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [show, setShow] = useState(false);
  const [comment, setComment] = useState({});

  const handleShow = (item) => {
    if (userIp !== item.ip) {
      return alert('작성자가 아닙니다.');
    }
    setShow(true);
    setComment({
      ...comment,
    });
  };

  useEffect(() => {
    getComments();
    getUserIp();
  }, []);

  return (
    <Margin>
      <div>
        <div>
          {comments.map((item) => {
            return (
              <ul key={item.id}>
                <li>{item.id}</li>
                <li>{item.ip}</li>
                <li>댓글내용 : {item.contents}</li>
                <li>{item.parentCommentId}</li>
                <li>{item.depth}</li>
                <li>{item.createdAt}</li>
                <li>{item.updatedAt}</li>
                <Button
                  onClick={() => {
                    handleShow(item);
                  }}
                >
                  수정
                </Button>
                {show && (
                  <UpdateComment
                    item={item}
                    show={show}
                    setComments={setComments}
                    setShow={setShow}
                  />
                )}
                <Button onClick={() => deleteComment(item.id, item.ip)}>
                  삭제
                </Button>
              </ul>
            );
          })}
        </div>
      </div>
    </Margin>
  );
}

const Margin = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;

export default GetComments;
