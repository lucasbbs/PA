import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationUI = ({
  incomesPerPage,
  totalIncomes,
  paginate,
  currentPageNumber,
}) => {
  const { id } = useParams();

  const incomeNumbers = [];

  for (let i = 1; i <= Math.ceil(totalIncomes / incomesPerPage); i++) {
    incomeNumbers.push(i);
  }
  return (
    <Nav>
      <Pagination size='lg' aria-label='Page navigation example'>
        <PaginationItem>
          <PaginationLink first href='#' />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous href='#' />
        </PaginationItem>
        {incomeNumbers.map((number) => (
          <PaginationItem
            key={number}
            className='page-item'
            active={currentPageNumber === number ? true : false}
          >
            <PaginationLink
              onClick={() => paginate(number)}
              to={`/admin/investment/${id}/${number}#`}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink next href='#' />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href='#' />
        </PaginationItem>
      </Pagination>
    </Nav>
  );
};

export default PaginationUI;
