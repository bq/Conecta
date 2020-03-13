import React, { FC } from "react";
import Router from "next/router";
import styled from "@emotion/styled";
import cookie from "js-cookie";

import Container from "../components/Container";
import Button from "../components/Button";

interface IHeaderProps {
  email?: string;
}

const Header: FC<IHeaderProps> = ({ email }) => {
  const onLogout = () => {
    cookie.set("token", "");
    window.location.href = "/";
  };

  return (
    <HeaderContainer>
      <h1>Conecta</h1>
      {email && (
        <LoginContainer>
          {email} <HeaderButton onClick={onLogout}>Salir</HeaderButton>
        </LoginContainer>
      )}
      {!email && (
        <LoginContainer>
          ¿Ya estás registrado?{" "}
          <HeaderButton onClick={() => Router.push("/login")}>
            Entrar
          </HeaderButton>
        </LoginContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  height: 40px;
  margin: 20px 0px;

  h1 {
    flex: 1;
    text-transform: uppercase;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderButton = styled(Button)`
  margin-left: 20px;
  font-size: 14px;
  padding: 0px 16px;
  height: 36px;
`;
