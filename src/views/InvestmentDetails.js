import React, { useEffect, useState } from 'react';
import { fetchInvestments } from 'services/Investments';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Row,
  Table,
} from 'reactstrap';
import { useParams } from 'react-router-dom';

// import InputMask from 'react-input-mask';
import NumberFormat from 'react-number-format';
// import { moment } from 'moment';
// import InvestmentsList from 'InvestmentsList.js';

const InvestmentDetails = () => {
  const [name, setName] = useState('');
  const [broker, setBroker] = useState('');
  const [type, setType] = useState('');
  const [rate, setRate] = useState('');
  const [indexer, setIndexer] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [investmentDate, setInvestmentDate] = useState('');
  const [initialAmount, setInitialAmount] = useState(0);
  const [accruedIncome, setAccruedIncome] = useState(0);
  const [investment, setInvestment] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [array, setArray] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getInvestmentDetails = async () => {
      const investment = await fetchInvestments(id);
      setInvestment(investment);
      setName(investment.name);
      setBroker(investment.broker);
      setType(investment.type);
      setRate(investment.rate);
      setIndexer(investment.indexer);
      setDueDate(investment.due_date);
      setInvestmentDate(investment.investment_date);
      setInitialAmount(investment.initial_amount);
      setAccruedIncome(investment.accrued_income);
      setArray(
        investment.incomes
          .map((key) => Object.keys(key).map((date) => date))
          .flat()
          .map((data) => {
            let datePartes = data.split('-');
            return `${datePartes[2]}/${datePartes[1]}/${datePartes[0]}`;
          })
      );
      // console.log(investment.incomes);
      setIncomes(investment.incomes.map((key) => Object.values(key).flat()));

      // console.log(incomes);
    };
    getInvestmentDetails();
  }, [id]);

  return (
    <>
      <div className='content'>
        <Row>
          <Col md='12'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <h1 style={{ marginBottom: '0' }}>{name}</h1>
              <Button>Editar</Button>
            </div>
            {/* <Input
              type='tel'
              mask='+4\9 99 999 99'
              maskChar=' '
              tag={InputMask}
            /> */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Col md='7'>
                <Row style={{ marginBottom: '10px' }}>
                  <Col md='7' style={{ paddingRight: '0' }}>
                    <Input
                      style={{ backgroundColor: '#2b3553' }}
                      type='text'
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        console.log(name);
                      }}
                    />
                  </Col>

                  <Col md='2' style={{ paddingRight: '0' }}>
                    <Input
                      style={{ backgroundColor: '#2b3553' }}
                      type='select'
                      value={broker}
                      onChange={(e) => setBroker(e.target.value)}
                    >
                      <option>Inter</option>
                      <option>Easynvest</option>
                      <option>Ativa</option>
                    </Input>
                  </Col>
                  <Col md='1' style={{ paddingRight: '0' }}>
                    <Input
                      style={{ backgroundColor: '#2b3553' }}
                      type='select'
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option>CDB</option>
                      <option>LCI</option>
                      <option>LCA</option>
                      <option>Debênture</option>
                    </Input>
                  </Col>
                  <Col md='2' style={{ paddingRight: '0' }}>
                    <Input
                      style={{ backgroundColor: '#2b3553' }}
                      type='text'
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md='2' style={{ paddingRight: '0' }}>
                    <Input
                      style={{ backgroundColor: '#2b3553' }}
                      type='select'
                      value={indexer}
                      onChange={(e) => setIndexer(e.target.value)}
                    >
                      <option>CDI</option>
                      <option>IPCA</option>
                      <option>Prefixado</option>
                    </Input>
                  </Col>
                  <Col md='3' style={{ paddingRight: '0' }}>
                    <Input
                      style={{ backgroundColor: '#2b3553' }}
                      type='date'
                      value={investmentDate}
                      onChange={(e) => setInvestmentDate(e.target.value)}
                    />
                  </Col>
                  <Col md='3' style={{ paddingRight: '0' }}>
                    <Input
                      style={{ backgroundColor: '#2b3553' }}
                      type='date'
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </Col>
                  <Col md='2' style={{ paddingRight: '0' }}>
                    <NumberFormat
                      style={{ backgroundColor: '#2b3553' }}
                      onChange={(e) => setInitialAmount(e.target.value)}
                      type='text'
                      value={initialAmount}
                      placeholder='R$0.00'
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      prefix={'R$'}
                      customInput={Input}
                    />
                  </Col>
                  <Col md='2' style={{ paddingRight: '0' }}>
                    <NumberFormat
                      style={{ backgroundColor: '#2b3553' }}
                      onValueChange={({ formattedValue }) => {
                        setAccruedIncome(formattedValue);
                      }}
                      type='text'
                      value={accruedIncome}
                      placeholder='R$0.00'
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      prefix={'R$'}
                      customInput={Input}
                    />
                  </Col>
                </Row>
              </Col>
            </div>

            <Card style={{ marginTop: '25px' }}>
              <CardHeader>
                <CardTitle tag='h4'>Receitas</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className='tablesorter' responsive>
                  <thead className='text-primary'>
                    <tr>
                      {array.map((data) => (
                        <th> {data}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {incomes.map((key) => (
                        <td>
                          {key.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                      ))}
                    </tr>
                    {/* ))} */}
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

export default InvestmentDetails;
