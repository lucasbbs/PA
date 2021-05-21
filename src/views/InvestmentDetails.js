import React, { useEffect, useState } from 'react';
import { fetchInvestments } from 'services/Investments';
import PaginationUI from '../components/Pagination/Pagination';
import { Button, Col, Input, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';

// import InputMask from 'react-input-mask';
import NumberFormat from 'react-number-format';
import Incomes from '../components/Incomes/Incomes';
// import { moment } from 'moment';
// import InvestmentsList from 'InvestmentsList.js';

const InvestmentDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [investmentsPerPage, setInvestmentsPerpage] = useState(15);

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
  // const [incomes, setIncomes] = useState([]);
  const [incomes, setIncomes] = useState([]);
  // const [array, setArray] = useState([]);

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
      const dates = investment.incomes
        .map((key) => Object.keys(key).map((date) => date))
        .flat()
        .map((data) => {
          let datePartes = data.split('-');
          return `${datePartes[2]}/${datePartes[1]}/${datePartes[0]}`;
        });

      const IncomesTemp = investment.incomes.map(
        (key) => Object.values(key)[0]
      );

      let temparray = [];
      for (let i = 0; i < IncomesTemp.length; i++) {
        temparray.push([dates[i], IncomesTemp[i]]);
      }

      setIncomes(temparray);
    };
    getInvestmentDetails();
  }, [id]);

  const indexOfFirstInvestment = currentPage * investmentsPerPage;
  const indexOfLastInvestment = indexOfFirstInvestment + investmentsPerPage;

  const currentincomes = incomes.slice(
    indexOfFirstInvestment - investmentsPerPage,
    indexOfLastInvestment - investmentsPerPage
  );

  //Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const setNumberPerPage = (input) => {
    console.log(input);
    setInvestmentsPerpage(Number(input));
    setCurrentPage(1);
  };
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Col md='10'>
                <Row style={{ marginBottom: '10px' }}>
                  <Col md='6' style={{ paddingRight: '0' }}>
                    <Input
                      style={{ backgroundColor: '#2b3553' }}
                      type='text'
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
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
                  <Col md='2' style={{ paddingRight: '0' }}>
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

            <Incomes
              incomes={currentincomes}
              numberPerPage={investmentsPerPage}
              setNumberPerPage={setNumberPerPage}
            />
            <PaginationUI
              incomesPerPage={investmentsPerPage}
              totalIncomes={incomes.length}
              paginate={paginate}
              currentPageNumber={currentPage}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InvestmentDetails;
