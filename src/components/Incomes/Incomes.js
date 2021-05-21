import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormFeedback,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from 'reactstrap';

const Incomes = ({ incomes, numberPerPage, setNumberPerPage }) => {
  const [modal, setModal] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const toggle = () => {
    setModal(!modal);
    setIsValid(true);
  };

  const fun = (e) => {
    const inputEl = document.querySelector('#ModalInputId').value;
    if (inputEl < 0 || inputEl > 15) {
      setIsValid(false);
    } else {
      setIsValid(true);
      setNumberPerPage(inputEl);
      toggle();
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Defina quantas receitas por página serão exibidas
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            {isValid ? (
              <Input
                type='number'
                id='ModalInputId'
                style={{ color: 'black' }}
                min={0}
                max={15}
              />
            ) : (
              <>
                <Input
                  style={{ marginBottom: '20px', color: 'black' }}
                  invalid
                  type='number'
                  id='ModalInputId'
                  min={0}
                  max={15}
                />
                <FormFeedback tooltip>
                  Você deve informar um número emtre 0 e 15
                </FormFeedback>
              </>
            )}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={fun}
            style={{ margin: '0 20px 20px' }}
          >
            Definir
          </Button>
          <Button
            color='secondary'
            onClick={toggle}
            style={{ margin: '0 20px 20px' }}
          >
            Voltar
          </Button>
        </ModalFooter>
      </Modal>
      <Card style={{ marginTop: '25px' }}>
        <CardHeader
          stlye={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h4 className='title d-inline'>Receitas</h4>

          <Link onClick={toggle}>
            <i
              className='tim-icons icon-settings-gear-63'
              style={{ float: 'right' }}
            />
          </Link>
        </CardHeader>
        <CardBody>
          <Table className='tablesorter' responsive>
            <tbody className='text-primary'>
              <tr>
                {incomes.map((data) => (
                  <td key={data[0]}>{data[0]}</td>
                ))}
              </tr>

              <tr>
                {incomes.map((key) => (
                  <td key={key[1]}>
                    {key[1].toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Incomes;
