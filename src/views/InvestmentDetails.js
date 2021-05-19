import React, { useEffect } from 'react';
import { fetchInvestments } from 'services/Investments';
import { Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
// import InvestmentsList from 'InvestmentsList.js';

const InvestmentDetails = () => {
  const { id } = useParams();
  useEffect(() => {
    const getInvestmentDetails = async () => {
      const investment = await fetchInvestments(id);
      console.log(id);
    };
    getInvestmentDetails();
  }, []);
  return (
    <>
      <div className='content'>
        <Row>
          <Col md='12'>
            <h1>{id}</h1>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InvestmentDetails;
