import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../../lib/apollo";
import cookie from "js-cookie";

import TimePicker from "../../components/TimePicker";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Column from "../../components/Column";
import Panel from "../../components/Panel";
import Button from "../../components/Button";
import Input from "../../components/Input";

const SIGNUP_MUTATION = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $isVolunteer: Boolean
    $name: String
    $phone: String
    $availability: TimeTableInput
  ) {
    signUp(
      email: $email
      password: $password
      isVolunteer: $isVolunteer
      name: $name
      phone: $phone
      availability: $availability
    )
  }
`;

const Signup = () => {
  const router = useRouter();
  const { type } = router.query;

  const [timeSelection, setTimeSelection] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [signUp, { loading }] = useMutation(SIGNUP_MUTATION);

  const onSignup = async () => {
    try {
      const result = await signUp({
        variables: {
          email,
          password,
          name,
          phone,
          isVolunteer: type === "volunteer",
          availability: timeSelection
        }
      });
      cookie.set("token", result.data.signUp);
      Router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container mt={40} mb={40}>
      <SignupPanel>
        <h1>Registrarse para ofrecer cuidar</h1>
        <h2>Datos personales</h2>
        <Row width={1}>
          <Column width={[1, 1 / 2]}>
            <InputGroup>
              <label>Correo electrónico</label>
              <Input value={email} onChange={e => setEmail(e.target.value)} />
            </InputGroup>
            <InputGroup>
              <label>Contraseña</label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Nombre</label>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </InputGroup>
            <InputGroup>
              <label>Teléfono</label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} />
            </InputGroup>
          </Column>
        </Row>
        <h2>Marcar disponibilidad</h2>
        <Row>
          <Column width={1}>
            <TimePicker
              selection={timeSelection}
              onChange={setTimeSelection}
              pink={type === "requester"}
            />
          </Column>
        </Row>
        <Row mt={40} mb={20}>
          <Column width={1}>
            <Button onClick={() => onSignup()} pink={type === "requester"}>
              Registrarse
            </Button>
          </Column>
        </Row>
      </SignupPanel>
    </Container>
  );
};

export default withApollo({ ssr: true })(Signup);

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
