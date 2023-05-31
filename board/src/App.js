import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Pagination from "react-js-pagination";
import './styles/pagination.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalcount] = useState(0);
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const getPosts = async () => {
    try {
      await axios.get('api/v1/posts').then(({ data }) => {
        setTotalcount(data.length);
        console.log(totalCount);
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
    <Margin>
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
          {posts.map((item) => {
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
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={totalCount}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
      <Link to={'/post'}>
        <Button>글쓰기</Button>
      </Link>
    </Margin>
  );
}

const Margin = styled.div`
  margin-top: 100px;
  margin-right: 100px;
  margin-bottom: 100px;
  margin-left: 100px;
`;

export default App;
