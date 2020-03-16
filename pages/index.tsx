import { useState } from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import nextCookie from "next-cookies";
import { withApollo } from "../lib/apollo";
import { IUser } from "../types";

import Container from "../components/Container";
import Row from "../components/Row";
import Column from "../components/Column";
import Button from "../components/Button";
import Panel from "../components/Panel";
import Header from "../components/Header";
import UserTable from "../components/UserTable";

import { ME_QUERY, MATCH_USERS_QUERY, ALL_USERS_QUERY } from "../queries";

const Home = () => {
  const [showAllUsers, setShowAllUsers] = useState(false);
  const { loading, error, data: userData } = useQuery(ME_QUERY);
  const { data: matchUsersData } = useQuery(MATCH_USERS_QUERY, {
    skip: !userData
  });
  const { data: allUsersData } = useQuery(ALL_USERS_QUERY, {
    skip: !showAllUsers
  });

  if (loading) {
    return null;
  }

  const me = userData && userData.me;
  if (me) {
    const matchUsers = matchUsersData && (matchUsersData.matchUsers as IUser[]);
    const allUsers = allUsersData && (allUsersData.allUsers as IUser[]);
    return (
      <>
        <Head>
          <title>Conecta</title>
        </Head>
        <Header email={me.email} />
        <UsersContainer>
          {me.isVolunteer && (
            <h2>Usuarios compatibles con mi disponibilidad</h2>
          )}
          {!me.isVolunteer && (
            <h2>Voluntarios con disponibilidad para mi horario</h2>
          )}
          {matchUsers && matchUsers.length > 0 && (
            <UserTable users={matchUsers} />
          )}
          {matchUsers && matchUsers.length === 0 && (
            <p>De momento no hay usuarios con la misma disponibilidad</p>
          )}
          {!showAllUsers && (
            <Button onClick={() => setShowAllUsers(true)}>
              Mostrar todos los {me.isVolunteer ? "usuarios" : "voluntarios"}
            </Button>
          )}
          {showAllUsers && allUsers && (
            <>
              <h2>Todos los usuarios</h2>
              <UserTable users={allUsers} />
            </>
          )}
        </UsersContainer>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Conecta</title>
      </Head>
      <Header />
      <Container>
        <Row mt={20} mb={20}>
          <Column width={1}>
            <Hero>
              Conecta es una aplicación pensada para poner en contacto a gente
              que necesita ayuda con personas que se ofrecen voluntarias para
              ayudar. Regístrate más abajo en la opción correspondiente tanto si
              te ofreces voluntario, como si quieres solicitar ayuda.
              <strong>
                <u>
                  No te ofrezcas voluntario si crees que puedes estar
                  contagiado.
                </u>
              </strong>
            </Hero>
          </Column>
        </Row>

        <Row alignItems="stretch" mb={40}>
          <Column width={[1, 1 / 2]} mb={20}>
            <OptionPanel>
              <h2>Quiero ofrecerme voluntario</h2>
              <p>
                Selecciona esta opción para registrarte como voluntario para
                ayudar a vecinos que lo necesitan. Deberás rellenar tus datos de
                contacto y el horario en el que estarías disponible.{" "}
                <strong>
                  <u>
                    No te ofrezcas voluntario si crees que puedes estar
                    contagiado
                  </u>
                </strong>
              </p>
              <Link href="/signup/volunteer">
                <Button>Quiero ofrecerme voluntario</Button>
              </Link>
            </OptionPanel>
          </Column>
          <Column width={[1, 1 / 2]} mb={20}>
            <OptionPanel>
              <h2>Solicitar ayuda</h2>
              <p>
                Selecciona esta opción para registrarte para solicitar ayuda de
                algún voluntario. Puedes solicitar ayuda para ti o para otra
                persona. Deberás rellenar tus datos de contacto y el horario en
                que necesitas ayuda.
                <strong>
                  <u>
                    Si eres población de riesgo evita el contacto físico con los
                    voluntarios
                  </u>
                </strong>
              </p>
              <Link href="/signup/requester">
                <Button pink>Necesito ayuda</Button>
              </Link>
            </OptionPanel>
          </Column>
        </Row>
        <Row mb={20}>
          <Column widt={1} mx={"auto"}>
            <DiagramImage src="/diagram.jpeg" alt="Conecta diagram" />
          </Column>
        </Row>
      </Container>
    </>
  );
};

export default withApollo({ ssr: true })(Home);

const Hero = styled(Panel)`
  background-color: #999;
  color: white;
  text-align: center;
  font-weight: 500;
  line-height: 1.5;
  padding: 20px 60px;
`;

const OptionPanel = styled(Panel)`
  padding: 20px 40px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    font-size: 20px;
    margin-bottom: 16px;
  }

  p {
    text-align: center;
    line-height: 1.2;
    margin-bottom: 16px;
  }
`;

const UsersContainer = styled(Container)`
  h2 {
    margin: 20px 0px;
  }
  button {
    margin-top: 20px;
  }
  p {
    margin-bottom: 20px;
  }
`;

const DiagramImage = styled.img`
  max-width: 100%;
  max-height: 400px;
`;
