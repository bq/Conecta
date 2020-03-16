import React, { FC } from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "@emotion/styled";
import cookie from "js-cookie";

import Container from "../components/Container";
import Button from "../components/Button";

interface IHeaderProps {
  email?: string;
  hideLogin?: boolean;
}

const Header: FC<IHeaderProps> = ({ email, hideLogin }) => {
  const onLogout = () => {
    cookie.set("token", "");
    window.location.href = "/";
  };

  return (
    <HeaderContainer>
      <h1>
        <Link href="/">
          <a>Conecta</a>
        </Link>
      </h1>
      {email && (
        <LoginContainer>
          {email}{" "}
          <HeaderButton onClick={() => Router.push("/profile")}>
            Cambiar mis datos
          </HeaderButton>{" "}
          <HeaderButton onClick={onLogout}>Salir</HeaderButton>
        </LoginContainer>
      )}
      {!email && !hideLogin && (
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
  margin: 20px auto;

  h1 {
    flex: 1;
    text-transform: uppercase;
    a {
      text-decoration: none;
      color: inherit;
    }
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
