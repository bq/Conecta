import Head from "next/head";
import styled from "@emotion/styled";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import nextCookie from "next-cookies";
import { withApollo } from "../lib/apollo";

import Container from "../components/Container";
import Row from "../components/Row";
import Column from "../components/Column";
import Button from "../components/Button";
import Panel from "../components/Panel";
import Header from "../components/Header";

const ME_QUERY = gql`
  query Me {
    me {
      email
      isVolunteer
    }
  }
`;

const MATCH_USERS_QUERY = gql`
  query MatchUsers {
    matchUsers {
      name
      email
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(ME_QUERY);
  const { data: matchUsersData } = useQuery(MATCH_USERS_QUERY);

  if (loading) {
    return null;
  }

  const me = data && data.me;
  if (me) {
    console.log(matchUsersData);
    return (
      <>
        <Head>
          <title>Conecta</title>
        </Head>
        <Header email={me.email} />
        <Container>
          <div>MY PROFILE</div>
        </Container>
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
        <Row mt={40} mb={20}>
          <Column width={1}></Column>
        </Row>
        <Row>
          <Column width={[1, 1 / 2]} mb={20}>
            <Panel>
              <Link href="/signup/volunteer">
                <Button>Quiero ofrecerme para cuidar</Button>
              </Link>
            </Panel>
          </Column>
          <Column width={[1, 1 / 2]} mb={20}>
            <Panel>
              <Link href="/signup/requester">
                <Button pink>Necesito ayuda para cuidar</Button>
              </Link>
            </Panel>
          </Column>
        </Row>
      </Container>
    </>
  );
};

export default withApollo({ ssr: true })(Home);
