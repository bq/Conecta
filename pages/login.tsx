import React, { useState } from "react";
import Router from "next/router";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../lib/apollo";
import cookie from "js-cookie";

import Header from "../components/Header";
import Panel from "../components/Panel";
import Button from "../components/Button";
import Input from "../components/Input";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
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
    <>
      <Container>
        <LoginPanel>
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
          <Button onClick={() => onLogin()}>Entrar</Button>
        </LoginPanel>
      </Container>
      <HeaderWrap>
        <Header hideLogin />
      </HeaderWrap>
    </>
  );
};

export default withApollo({ ssr: true })(Login);

const HeaderWrap = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
`;

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginPanel = styled(Panel)`
  max-width: 300px;
  width: 100%;
  margin: 10px;

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
