import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      await axios.get('api/v1/posts').then(({ data }) => {
        setPosts(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>작성자</th>
            <th>생성 시간</th>
            <th>수정 시간</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <Link to={`/post/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.ip}</td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Link to={'/post'}>
        <Button>글쓰기</Button>
      </Link>
    </div>
  );
}

export default App;
