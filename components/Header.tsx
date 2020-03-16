import React, { FC } from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "@emotion/styled";
import cookie from "js-cookie";

import Container from "../components/Container";
import Row from "../components/Row";
import Column from "../components/Column";
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
      <Row width={1} mt={20}>
        <Column width={[1, 1 / 2]} mb={20}>
          <h1>
            <Link href="/">
              <a>
                <img src="/logo_header.jpeg" alt="Las Rozas Conecta"></img>
              </a>
            </Link>
          </h1>
        </Column>
        <LoginColumn width={[1, 1 / 2]} mb={20}>
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
        </LoginColumn>
      </Row>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  margin: 0px auto;

  h1 {
    flex: 1;
    text-transform: uppercase;
    a {
      text-decoration: none;
      color: inherit;
    }

    img {
      height: 60px;
      max-width: 100%;
    }
  }
`;

const LoginColumn = styled(Column)`
  display: flex;
  justify-content: flex-end;
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
