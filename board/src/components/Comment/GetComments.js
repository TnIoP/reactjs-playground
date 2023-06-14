import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import UpdateComment from './UpdateComment';
import ReplyComment from './ReplyComment';

const GetComments = () => {
  const location = useLocation();

  const [comments, setComments] = useState([]);
  const [showReply, setShowReply] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [comment, setComment] = useState({});

  const handleShowReply = async (item) => {
    
      setShowReply(true);
    setComment({
      ...comment,
    });
  };

  const handleShowUpdate = async (item) => {
    await axios.get('https://geolocation-db.com/json/').then((res) => {
        const userIp = res.data.IPv4;
        if (userIp !== item.ip) {
          return alert('작성자가 아닙니다.');
        }
      });
      setShowUpdate(true);
    setComment({
      ...comment,
    });
  };

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
      await axios.get('https://geolocation-db.com/json/').then((res) => {
        const userIp = res.data.IPv4;
        if (userIp !== ip) {
          return alert('작성자가 아닙니다.');
        }
      });
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

  useEffect(() => {
    getComments();
  }, [comments]);

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
                    handleShowReply(item);
                  }}
                >
                  댓글
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdate(item);
                  }}
                >
                  수정
                </Button>
                <Button onClick={() => deleteComment(item.id, item.ip)}>
                  삭제
                </Button>
                {showReply && (
                  <ReplyComment
                    item={item}
                    show={showReply}
                    setComments={setComments}
                    setShow={setShowReply}
                  />
                )}
                {showUpdate && (
                  <UpdateComment
                    item={item}
                    show={showUpdate}
                    setComments={setComments}
                    setShow={setShowUpdate}
                  />
                )}
              </ul>
            );
          })}
        </div>
      </div>
    </Margin>
  );
};

const Margin = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;

export default GetComments;
