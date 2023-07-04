import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import './styles/pagination.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalcount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const offset = (page - 1) * limit;
    const getPosts = async () => {
      try {
        await axios
          .get('api/v1/posts', {
            params: {
              limit,
              offset,
            },
          })
          .then(({ data }) => {
            setTotalcount(data.data.total);
            setPosts(data.data.posts);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [limit, page]);

  return (
    <Margin>
      <label>
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => {
            setLimit(Number(value));
            setPage(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </label>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성 시간</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <Link to={`/post/${item.id}`} state={{ post_id: item.id }}>
                    {item.title}
                  </Link>
                </td>
                <td>{item.ip}</td>
                <td>{item.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Link to={'/post'}>
        <Button>글쓰기</Button>
      </Link>
      <Pagination
        activePage={page}
        itemsCountPerPage={limit}
        totalItemsCount={totalCount}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={handlePageChange}
      />
    </Margin>
  );
};

const Margin = styled.div`
  margin-top: 100px;
  margin-right: 100px;
  margin-bottom: 100px;
  margin-left: 100px;
`;

export default App;
