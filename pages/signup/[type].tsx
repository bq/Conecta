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
import Header from "../../components/Header";
import Checkbox from "../../components/Checkbox";
import ServicesChecklist from "../../components/ServicesChecklist";

const SIGNUP_MUTATION = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $isVolunteer: Boolean
    $name: String
    $phone: String
    $dni: String!
    $availability: TimeTableInput
    $services: ServicesInput
  ) {
    signUp(
      email: $email
      password: $password
      isVolunteer: $isVolunteer
      name: $name
      phone: $phone
      dni: $dni
      availability: $availability
      services: $services
    )
  }
`;

const Signup = () => {
  const router = useRouter();
  const { type } = router.query;

  const [services, setServices] = useState({});
  const [timeSelection, setTimeSelection] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDNI] = useState("");
  const [signUp, { loading }] = useMutation(SIGNUP_MUTATION);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const onSignup = async () => {
    try {
      const result = await signUp({
        variables: {
          email,
          password,
          name,
          phone,
          dni,
          isVolunteer: type === "volunteer",
          availability: timeSelection,
          services
        }
      });
      cookie.set("token", result.data.signUp);
      Router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <Container mt={40} mb={40}>
        <SignupPanel>
          {type === "volunteer" && <h1>Registrarse como voluntario</h1>}
          {type !== "volunteer" && <h1>Registrarse para pedir ayuda</h1>}
          <h2>Datos personales</h2>
          <Row width={1}>
            <Column width={[1, 1 / 2]}>
              <InputGroup>
                <label>Correo electrónico (Obligatorio)</label>
                <Input value={email} onChange={e => setEmail(e.target.value)} />
              </InputGroup>
              <InputGroup>
                <label>Contraseña (Obligatorio)</label>
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
              <InputGroup>
                <label>DNI (Obligatorio)</label>
                <Input value={dni} onChange={e => setDNI(e.target.value)} />
              </InputGroup>
            </Column>
          </Row>
          {type === "volunteer" && <h2>Servicios que ofrezco</h2>}
          {type !== "volunteer" && <h2>Servicios que necesito</h2>}
          <Row width={1}>
            <Column width={[1, 1 / 2]}>
              <ServicesChecklist services={services} onChange={setServices} />
            </Column>
          </Row>
          <h2>Marcar horario de ayuda</h2>
          <Row>
            <Column width={1}>
              <TimePicker
                selection={timeSelection}
                onChange={setTimeSelection}
                pink={type === "requester"}
              />
            </Column>
          </Row>
          <Row>
            <Column width={1}>
              <Terms>
                <h3>Aviso Legal</h3>
                <p>
                  En cumplimiento del deber de informar que establece la
                  normativa vigente en materia de Protección de Datos Personales
                  (Reglamento Europeo 2016/679, de 27 de abril de 2016, de
                  Protección de Datos Personales) le proporcionamos la siguiente
                  información:
                </p>
                <p>
                  La información sobre protección de datos de carácter personal
                  de los usuarios de la Concejalía de Innovación, Educación,
                  Economía y Empleo será tratada de conformidad con la normativa
                  de Protección de Datos Personales (Reglamento Europeo
                  2016/679, de 27 de abril de 2016, de Protección de Datos
                  Personales)
                </p>
                <p>FINALIDAD:</p>
                <p>Contactar voluntarios con gente que necesita ayuda</p>
                <p>LEGITIMACIÓN: Consentimiento del interesado.</p>
                <p>CESIONES: No se contemplan.</p>
                <p>
                  CONSERVACIÓN: Durante la relación contractual y/o hasta que
                  nos solicite la baja y, durante los plazos exigidos por ley
                  para atender eventuales responsabilidades finalizada la
                  relación.
                </p>
                <p>
                  DERECHOS: Puede ejercer su derecho de acceso, rectificación,
                  supresión, portabilidad de sus datos y la limitación u
                  oposición en las direcciones indicadas. En caso de
                  divergencias, puede presentar una reclamación ante las
                  autoridades de protección de datos (Agencia Española de
                  Protección de Datos mediante escrito C/ Jorge Juan, 6,
                  28001-Madrid o formulario en su Sede electrónica.)
                </p>
              </Terms>
              <TermsCheckbox
                label="Acepto las condiciones"
                checked={acceptTerms}
                onChange={checked => setAcceptTerms(checked)}
              />
            </Column>
          </Row>
          <Row mt={40} mb={20}>
            <Column width={1}>
              <Button
                onClick={() => onSignup()}
                pink={type === "requester"}
                disabled={!dni || !email || !password || !acceptTerms}
              >
                Registrarse
              </Button>
            </Column>
          </Row>
        </SignupPanel>
      </Container>
    </>
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

const Terms = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  height: 300px;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  margin-top: 40px;

  h3 {
    margin: 10px 0px;
  }
  p {
    margin: 10px 0px;
  }
`;

const TermsCheckbox = styled(Checkbox)`
  margin: 20px 10px;
`;
