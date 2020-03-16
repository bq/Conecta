import React, { useState, useEffect } from "react";
import Router from "next/router";
import styled from "@emotion/styled";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../lib/apollo";

import ServicesChecklist from "../components/ServicesChecklist";
import TimePicker from "../components/TimePicker";
import Container from "../components/Container";
import Row from "../components/Row";
import Column from "../components/Column";
import Panel from "../components/Panel";
import Button from "../components/Button";
import Input from "../components/Input";
import Header from "../components/Header";

import {
  ME_QUERY,
  UPDATE_PROFILE_MUTATION,
  ALL_USERS_QUERY,
  MATCH_USERS_QUERY
} from "../queries";

const Profile = () => {
  const { loading, error, data: userData } = useQuery(ME_QUERY);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDNI] = useState("");
  const [timeSelection, setTimeSelection] = useState({});
  const [services, setServices] = useState({});
  const [updateProfile, { loading: updateLoading }] = useMutation(
    UPDATE_PROFILE_MUTATION,
    {
      refetchQueries: [
        { query: ME_QUERY },
        { query: ALL_USERS_QUERY },
        { query: MATCH_USERS_QUERY }
      ]
    }
  );

  const me = userData && userData.me;

  useEffect(() => {
    if (me) {
      setName(me.name || "");
      setPhone(me.phone || "");
      setDNI(me.dni || "");
      const { L, M, X, J, V, S, D } = me.availability;
      setTimeSelection({ L, M, X, J, V, S, D });
      const {
        childCare,
        shopping,
        pharmacy,
        laundry,
        call,
        other,
        otherText
      } = me.services || {};
      setServices({
        childCare,
        shopping,
        pharmacy,
        laundry,
        call,
        other,
        otherText
      });
    }
  }, [me]);

  if (loading) {
    return null;
  }

  const onUpdate = async () => {
    try {
      const result = await updateProfile({
        variables: {
          name,
          phone,
          dni,
          services,
          availability: timeSelection
        }
      });
      Router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header hideLogin />
      <Container mt={40} mb={40}>
        <ProfilePanel>
          <h1>Cambiar mis datos</h1>
          <h2>Datos personales</h2>
          <Row width={1}>
            <Column width={[1, 1 / 2]}>
              <InputGroup>
                <label>Nombre</label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </InputGroup>
              <InputGroup>
                <label>Teléfono</label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} />
              </InputGroup>
              <InputGroup>
                <label>DNI (Obligatorio)</label>
                <Input value={dni} onChange={e => setDNI(e.target.value)} />
              </InputGroup>
            </Column>
          </Row>
          <h2>Marcar horario de ayuda</h2>
          <Row width={1}>
            <Column width={[1, 1 / 2]}>
              <ServicesChecklist services={services} onChange={setServices} />
            </Column>
          </Row>
          <Row>
            <Column width={1}>
              <TimePicker
                selection={timeSelection}
                onChange={setTimeSelection}
                pink={me && !me.isVolunteer}
              />
            </Column>
          </Row>
          <Row mt={40} mb={20}>
            <Column width={1}>
              <Button onClick={() => onUpdate()} pink={me && !me.isVolunteer}>
                Cambiar
              </Button>
            </Column>
          </Row>
        </ProfilePanel>
      </Container>
    </>
  );
};

export default withApollo({ ssr: true })(Profile);

const ProfilePanel = styled(Panel)`
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
