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

  const handleShowReply = async () => {
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
        window.location.replace(`/post/${location.state.post_id}`);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Margin>
      <div>
        <div>
          {comments.map((item) => {
            return (
              <ul key={item.id} style={{ marginLeft: item.depth * 50 + 'px' }}>
                <li>
                  댓글 id : {item.id} / 작성자 ip : {item.ip} / 댓글내용 :{' '}
                  {item.contents} / 부모 id : {item.parentCommentId} / depth :{' '}
                  {item.depth} / 생성 시간 : {item.createdAt} / 수정 시간 :{' '}
                  {item.updatedAt}
                  <Button
                    onClick={() => {
                      handleShowReply();
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
                </li>
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
  margin-bottom: 50px;
`;

export default GetComments;
