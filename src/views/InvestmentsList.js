import React, { useEffect, useState } from 'react';
import { fetchInvestments } from 'services/Investments';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

const InvestmentsList = () => {
  const [investment, setInvestment] = useState([]);
  useEffect(() => {
    const getInvestments = async () => {
      let investments = await fetchInvestments();
      setInvestment(investments);
      return investments;
    };
    getInvestments();
  }, []);

  return (
    <>
      <div className='content'>
        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>
                <CardTitle tag='h4'>Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table
                  className='tablesorter'
                  responsive
                  style={{ overflowX: 'auto' }}
                >
                  <thead className='text-primary'>
                    <tr>
                      <th>Name</th>
                      <th>Broker</th>
                      <th>Type</th>
                      <th>Rate</th>
                      <th>Indexer</th>
                      <th>investment date</th>
                      <th>due date</th>
                      <th className='text-center'>initial amount</th>
                      <th className='text-center'>accrued income</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investment.map((inves) => (
                      <tr key={inves.id}>
                        <td>
                          <Link to={`/admin/investment/${inves.id}`}>
                            {inves.name}
                          </Link>
                        </td>
                        <td>{inves.broker}</td>
                        <td>{inves.type}</td>
                        <td>{inves.rate}</td>
                        <td>{inves.indexer}</td>
                        <td>
                          {moment(inves.investment_date).format('DD/MM/YYYY')}
                        </td>
                        <td>{moment(inves.due_date).format('DD/MM/YYYY')}</td>
                        <td className='text-center'>
                          {inves.initial_amount.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                        <td className='text-center'>
                          {inves.accrued_income.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InvestmentsList;
