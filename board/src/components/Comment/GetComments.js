import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import UpdateComment from './UpdateComment';

const GetComments = () => {
  const location = useLocation();

  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState({});

  const handleShow = async (item) => {
    await axios.get('https://geolocation-db.com/json/').then((res) => {
        const userIp = res.data.IPv4;
        if (userIp !== item.ip) {
          return alert('작성자가 아닙니다.');
        }
      });
    setShow(true);
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
                    handleShow(item);
                  }}
                >
                  수정
                </Button>
                <Button onClick={() => deleteComment(item.id, item.ip)}>
                  삭제
                </Button>
                {show && (
                  <UpdateComment
                    item={item}
                    show={show}
                    setComments={setComments}
                    setShow={setShow}
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
