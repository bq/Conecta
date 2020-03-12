import React, { useState } from "react";
import styled from "@emotion/styled";
import TimePicker from "../components/TimePicker";
import Container from "../components/Container";
import Row from "../components/Row";
import Column from "../components/Column";
import Panel from "../components/Panel";
import Button from "../components/Button";
import Input from "../components/Input";

const Signup = () => {
  const [timeSelection, setTimeSelection] = useState({});

  return (
    <Container mt={40} mb={40}>
      <SignupPanel>
        <h1>Registrarse para ofrecer cuidar</h1>
        <h2>Datos personales</h2>
        <Row width={1}>
          <Column width={[1, 1 / 2]}>
            <InputGroup>
              <label>Correo electrónico</label>
              <Input />
            </InputGroup>
            <InputGroup>
              <label>Contraseña</label>
              <Input type="password" />
            </InputGroup>
            <InputGroup>
              <label>Nombre</label>
              <Input />
            </InputGroup>
            <InputGroup>
              <label>Teléfono</label>
              <Input />
            </InputGroup>
          </Column>
        </Row>
        <h2>Marcar disponibilidad</h2>
        <Row>
          <Column width={1}>
            <TimePicker selection={timeSelection} onChange={setTimeSelection} />
          </Column>
        </Row>
        <Row mt={40} mb={20}>
          <Column width={1}>
            <Button>Registrarse</Button>
          </Column>
        </Row>
      </SignupPanel>
    </Container>
  );
};

export default Signup;

const SignupPanel = styled(Panel)`
  h1 {
    font-size: 20px;
    text-align: center;
    margin: 20px 0px;
  }
  h2 {
    margin: 20px 0px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 8px;
  }
`;
