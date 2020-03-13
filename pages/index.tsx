import Head from 'next/head';
import styled from "@emotion/styled";
import Link from 'next/link';
import Container from "../components/Container";
import Row from "../components/Row";
import Column from "../components/Column";
import Button from "../components/Button";
import Panel from "../components/Panel";

const Home = () => (
  <Container>
    <Head>
      <title>Conecta</title>
    </Head>
    <Row mt={40} mb={20}>
      <Column width={1}>
        <Header>
          <h1>Conecta</h1>
          <p>¿Ya estás registrado? <Button>Entrar</Button></p>
        </Header>
      </Column>
    </Row>
    <Row>
      <Column width={[1, 1 / 2]} mb={20}>
        <Panel>
          <Link href="/signup">
            <Button>Quiero ofrecerme para cuidar</Button>
          </Link>
        </Panel>
      </Column>
      <Column width={[1, 1 / 2]} mb={20}>
        <Panel>
          <Button pink>Necesito ayuda para cuidar</Button>
        </Panel>
      </Column>
    </Row>
  </Container>
);

export default Home;

const Header = styled(Panel)`
  display: flex;
  flex-direction: row;

  h1 {
    text-transform: uppercase;
  }
`;

