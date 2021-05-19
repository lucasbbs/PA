import React, { useEffect, useState } from 'react';
import { fetchInvestments } from 'services/Investments';
import { Button, Col, Input, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
// import CurrencyInput from 'layouts/inputs/CurrencyInput';
import InputMask from 'react-input-mask';
import NumberFormat from 'react-number-format';
// import InvestmentsList from 'InvestmentsList.js';

const InvestmentDetails = () => {
  const [investment, setInvestment] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getInvestmentDetails = async () => {
      const investment = await fetchInvestments(id);
      setInvestment(investment);
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
              <h1 style={{ marginBottom: '0' }}>
                {investment.accrued_income}###{investment.name}
              </h1>
              <Button>Editar</Button>
            </div>
            <Input
              type='tel'
              mask='+4\9 99 999 99'
              maskChar=' '
              tag={InputMask}
            />
            <Input type='text' value={investment.name} />
            <Input type='select' value={investment.broker}>
              <option>Inter</option>
              <option>Easynvest</option>
              <option>Ativa</option>
            </Input>
            <Input type='select' value={investment.type}>
              <option>CDB</option>
              <option>LCI</option>
              <option>LCA</option>
              <option>Debênture</option>
            </Input>
            <Input type='text' value={investment.rate} />
            <Input type='select' value={investment.indexer}>
              <option>CDI</option>
              <option>IPCA</option>
              <option>Prefixado</option>
            </Input>
            <Input type='date' value={investment.investment_date} />
            <Input type='date' value={investment.due_date} />
            <NumberFormat
              placeholder='R$0.00'
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'R$'}
              customInput={Input}
            />
            <Input
              type='text'
              value={investment.initial_amount}
              placeholder='R$0.00'
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'R$'}
              customInput={Input}
            />
            <NumberFormat
              type='text'
              value={investment.accrued_income}
              placeholder='R$0.00'
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'R$'}
              customInput={Input}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InvestmentDetails;
