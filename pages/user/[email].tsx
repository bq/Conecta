import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "../../lib/apollo";

import TimePicker from "../../components/TimePicker";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Column from "../../components/Column";
import Panel from "../../components/Panel";
import Header from "../../components/Header";
import Button from "../../components/Button";

import { GET_USER_QUERY } from "../../queries";

const UserPage = () => {
  const router = useRouter();
  const email = decodeURIComponent(router.query.email as string);
  const { loading, error, data: userData } = useQuery(GET_USER_QUERY, {
    variables: { email }
  });

  const user = userData && userData.getUser;

  if (loading || !user) {
    return null;
  }

  const services = user.services || {};

  return (
    <>
      <Header />
      <Container mt={40} mb={40}>
        <UserPanel>
          <h1>Perfil de usuario</h1>
          <h2>Datos personales</h2>
          <Row width={1}>
            <Column width={[1, 1 / 2]}>
              <p>
                <b>Email: </b>
                {user.email}
              </p>
              <p>
                <b>Nombre: </b>
                {user.name}
              </p>
              <p>
                <b>Teléfono: </b>
                {user.phone}
              </p>
            </Column>
          </Row>
          {user.isVolunteer && <h2>Servicios que ofrece</h2>}
          {!user.isVolunteer && <h2>Servicios que solicita</h2>}
          <Row width={1}>
            <Column width={[1, 1 / 2]}>
              {services.childCare && "Cuidado de niños, "}
              {services.shopping && "Hacer la compra, "}
              {services.pharmacy && "Productos de farmacia, "}
              {services.laundry && "Lavandería, "}
              {services.call && "Necesito que me llamen, "}
              {services.other && services.otherText}
            </Column>
          </Row>
          <h2>Horario de ayuda</h2>
          <Row>
            <Column width={1}>
              <TimePicker
                selection={user.availability}
                pink={!user.isVolunteer}
              />
            </Column>
          </Row>
          <Row mt={40} mb={20}>
            <Column width={1}>
              <Button onClick={() => Router.push("/")}>Volver</Button>
            </Column>
          </Row>
        </UserPanel>
      </Container>
    </>
  );
};

export default withApollo({ ssr: true })(UserPage);

const UserPanel = styled(Panel)`
  h1 {
    font-size: 20px;
    text-align: center;
    margin: 20px 0px;
  }
  h2 {
    margin: 20px 0px;
    text-align: left;
  }
  p {
    margin: 10px 0px;
  }
`;
