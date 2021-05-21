/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// react plugin used to create charts
import { Line, Bar, Pie } from 'react-chartjs-2';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Table,
  Row,
  Col,
} from 'reactstrap';

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  chartDefault,
} from 'variables/charts.js';
import { fetchInvestments } from '../services/Investments';

function Dashboard(props) {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [
    dataChartInvetmentsPerBrokers,
    setDataChartInvetmentsPerartBrokers,
  ] = useState([]);

  const [bigChartData, setbigChartData] = useState('data1');
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  useEffect(() => {
    setLoading(true);
    const getInvestmentDetails = async () => {
      const investment = await fetchInvestments();
      setInvestments(investment);

      let brokers = [...new Set(investment.map((inv) => inv.broker))];

      const somas = [];
      for (let i = 0; i < brokers.length; i++) {
        let soma = 0;
        for (let j = 0; j < investment.length; j++) {
          if (investment[j].broker === brokers[i]) {
            soma += investment[j].initial_amount + investment[j].accrued_income;
          }
        }
        somas.push(soma);
      }

      const filtered = [[...somas], [...brokers]];
      setDataChartInvetmentsPerartBrokers(filtered);
    };
    setLoading(false);
    getInvestmentDetails();
  }, []);
  console.log(dataChartInvetmentsPerBrokers);
  return (
    <>
      <div className='content'>
        {!dataChartInvetmentsPerBrokers.length ? (
          <h2>Carregando...</h2>
        ) : (
          <>
            {' '}
            <Row>
              <Col xs='12'>
                <Card className='card-chart'>
                  <CardHeader>
                    <Row>
                      <Col className='text-left' sm='6'>
                        <h5 className='card-category'>Total Shipments</h5>
                        <CardTitle tag='h2'>Performance</CardTitle>
                      </Col>
                      <Col sm='6'>
                        <ButtonGroup
                          className='btn-group-toggle float-right'
                          data-toggle='buttons'
                        >
                          <Button
                            tag='label'
                            className={classNames('btn-simple', {
                              active: bigChartData === 'data1',
                            })}
                            color='info'
                            id='0'
                            size='sm'
                            onClick={() => setBgChartData('data1')}
                          >
                            <span className='d-none d-sm-block d-md-block d-lg-block d-xl-block'>
                              Accounts
                            </span>
                            <span className='d-block d-sm-none'>
                              <i className='tim-icons icon-single-02' />
                            </span>
                          </Button>
                          <Button
                            color='info'
                            id='1'
                            size='sm'
                            tag='label'
                            className={classNames('btn-simple', {
                              active: bigChartData === 'data2',
                            })}
                            onClick={() => setBgChartData('data2')}
                          >
                            <span className='d-none d-sm-block d-md-block d-lg-block d-xl-block'>
                              Purchases
                            </span>
                            <span className='d-block d-sm-none'>
                              <i className='tim-icons icon-gift-2' />
                            </span>
                          </Button>
                          <Button
                            color='info'
                            id='2'
                            size='sm'
                            tag='label'
                            className={classNames('btn-simple', {
                              active: bigChartData === 'data3',
                            })}
                            onClick={() => setBgChartData('data3')}
                          >
                            <span className='d-none d-sm-block d-md-block d-lg-block d-xl-block'>
                              Sessions
                            </span>
                            <span className='d-block d-sm-none'>
                              <i className='tim-icons icon-tap-02' />
                            </span>
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className='chart-area'>
                      <Line
                        data={chartExample1[bigChartData]}
                        options={chartExample1.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg='4'>
                <Card className='card-chart'>
                  <CardHeader>
                    <h5 className='card-category'>Total Shipments</h5>
                    <CardTitle tag='h3'>
                      <i className='tim-icons icon-bell-55 text-info' /> 763,215
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className='chart-area'>
                      <Line
                        data={chartExample2.data}
                        options={chartExample2.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='4'>
                <Card className='card-chart'>
                  <CardHeader>
                    <h5 className='card-category'>Daily Sales</h5>
                    <CardTitle tag='h3'>
                      <i className='tim-icons icon-delivery-fast text-primary' />
                      3,500€
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className='chart-area'>
                      <Bar
                        data={chartExample3.data}
                        options={chartExample3.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='4'>
                <Card className='card-chart'>
                  <CardHeader>
                    <h5 className='card-category'>Completed Tasks</h5>
                    <CardTitle tag='h3'>
                      <i className='tim-icons icon-send text-success' /> 12,100K
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className='chart-area'>
                      <Line
                        data={chartExample4.data}
                        options={chartExample4.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg='6' md='12'>
                <Card className='card-tasks'>
                  <CardHeader>
                    <h6 className='title d-inline'>
                      Investimentos por Corretoras
                    </h6>
                    {/* <p className='card-category d-inline'> today</p> */}
                    <UncontrolledDropdown>
                      <DropdownToggle
                        caret
                        className='btn-icon'
                        color='link'
                        data-toggle='dropdown'
                        type='button'
                      >
                        <i className='tim-icons icon-settings-gear-63' />
                      </DropdownToggle>
                      <DropdownMenu aria-labelledby='dropdownMenuLink' right>
                        <DropdownItem
                          href='#pablo'
                          onClick={(e) => e.preventDefault()}
                        >
                          Action
                        </DropdownItem>
                        <DropdownItem
                          href='#pablo'
                          onClick={(e) => e.preventDefault()}
                        >
                          Another action
                        </DropdownItem>
                        <DropdownItem
                          href='#pablo'
                          onClick={(e) => e.preventDefault()}
                        >
                          Something else
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </CardHeader>
                  <CardBody>
                    <Pie
                      data={chartDefault(
                        dataChartInvetmentsPerBrokers[0],
                        dataChartInvetmentsPerBrokers[1]
                      )}
                      options={chartDefault().options}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' md='12'>
                <Card style={{ overflow: 'hidden' }}>
                  <CardHeader>
                    <CardTitle tag='h4'>Simple Table</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table
                      className='tablesorter'
                      responsive
                      style={{ overflow: 'auto' }}
                    >
                      <thead className='text-primary'>
                        <tr>
                          <th>Name</th>
                          <th>Country</th>
                          <th>City</th>
                          <th className='text-center'>Salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Dakota Rice</td>
                          <td>Niger</td>
                          <td>Oud-Turnhout</td>
                          <td className='text-center'>$36,738</td>
                        </tr>
                        <tr>
                          <td>Minerva Hooper</td>
                          <td>Curaçao</td>
                          <td>Sinaai-Waas</td>
                          <td className='text-center'>$23,789</td>
                        </tr>
                        <tr>
                          <td>Sage Rodriguez</td>
                          <td>Netherlands</td>
                          <td>Baileux</td>
                          <td className='text-center'>$56,142</td>
                        </tr>
                        <tr>
                          <td>Philip Chaney</td>
                          <td>Korea, South</td>
                          <td>Overland Park</td>
                          <td className='text-center'>$38,735</td>
                        </tr>
                        <tr>
                          <td>Doris Greene</td>
                          <td>Malawi</td>
                          <td>Feldkirchen in Kärnten</td>
                          <td className='text-center'>$63,542</td>
                        </tr>
                        <tr>
                          <td>Mason Porter</td>
                          <td>Chile</td>
                          <td>Gloucester</td>
                          <td className='text-center'>$78,615</td>
                        </tr>
                        <tr>
                          <td>Jon Porter</td>
                          <td>Portugal</td>
                          <td>Gloucester</td>
                          <td className='text-center'>$98,615</td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
