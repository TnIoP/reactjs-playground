import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import UpdateComment from './UpdateComment';
import ReplyComment from './ReplyComment';
import DeleteComment from './DeleteComment';

const GetComments = () => {
  const location = useLocation();

  const [comments, setComments] = useState([]);
  const [showReply, setShowReply] = useState('');
  const [showUpdate, setShowUpdate] = useState('');
  const [showDelete, setShowDelete] = useState('');
  const [comment, setComment] = useState({});

  const handleShowReply = async (id) => {
    setShowReply(id);
    setShowUpdate('');
    setShowDelete('');
    setComment({
      ...comment,
    });
  };

  const handleShowUpdate = async (item) => {
    setShowReply('');
    setShowUpdate(item.id);
    setShowDelete('');
    setComment({
      ...comment,
    });
  };

  const handleShowDelete = async (item) => {
    setShowReply('');
    setShowUpdate('');
    setShowDelete(item.id);
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

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Margin>
      <div>
        <div>
          {comments.map((item) => {
            if (item.isDeleted) {
              return (
                <ul
                  key={item.id}
                  style={{ marginLeft: item.depth * 50 + 'px' }}
                >
                  <li>
                    댓글 id : {item.id} / 작성자 ip : {item.ip} / 댓글내용 :
                    {'삭제된 댓글입니다.'} / 생성 시간 : {item.createdAt} / 삭제
                    시간 : {item.updatedAt}
                  </li>
                </ul>
              );
            }
            return (
              <ul key={item.id} style={{ marginLeft: item.depth * 50 + 'px' }}>
                <li>
                  댓글 id : {item.id} / 작성자 ip : {item.ip} / 댓글내용 :{' '}
                  {item.contents} / 작성 시간 : {item.createdAt}
                  <Button
                    onClick={() => {
                      handleShowReply(item.id);
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
                  <Button
                    onClick={() => {
                      handleShowDelete(item);
                    }}
                  >
                    삭제
                  </Button>
                  {item.id === showReply && (
                    <ReplyComment
                      item={item}
                      show={showReply}
                      setComments={setComments}
                      setShow={setShowReply}
                    />
                  )}
                  {item.id === showUpdate && (
                    <UpdateComment
                      item={item}
                      show={showUpdate}
                      setComments={setComments}
                      setShow={setShowUpdate}
                    />
                  )}
                  {item.id === showDelete && (
                    <DeleteComment
                      item={item}
                      show={showDelete}
                      setComments={setComments}
                      setShow={setShowDelete}
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
