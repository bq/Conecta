import React, { useState } from "react";
import Router from "next/router";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../lib/apollo";
import cookie from "js-cookie";

import Container from "../components/Container";
import Row from "../components/Row";
import Column from "../components/Column";
import Panel from "../components/Panel";
import Button from "../components/Button";
import Input from "../components/Input";

const LOGIN_MUTATION = gql`
  mutation Login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    )
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const onLogin = async () => {
    try {
      const result = await login({ variables: { email, password } });
      cookie.set("token", result.data.login);
      Router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container mt={40} mb={40}>
      <LoginPanel>
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
          </Column>
        </Row>
        <Button onClick={() => onLogin()}>Entrar</Button>
      </LoginPanel>
    </Container>
  );
};

export default withApollo({ ssr: true })(Login);

const LoginPanel = styled(Panel)`
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
