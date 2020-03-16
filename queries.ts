import gql from "graphql-tag";

export const ME_QUERY = gql`
  query Me {
    me {
      email
      name
      phone
      dni
      availability {
        L
        M
        X
        J
        V
        S
        D
      }
      services {
        childCare
        shopping
        pharmacy
        laundry
        call
        other
        otherText
      }
      isVolunteer
    }
  }
`;

export const MATCH_USERS_QUERY = gql`
  query MatchUsers {
    matchUsers {
      id
      name
      email
      phone
    }
  }
`;

export const ALL_USERS_QUERY = gql`
  query AllUsers {
    allUsers {
      id
      name
      email
      phone
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      name
      email
      phone
      availability {
        L
        M
        X
        J
        V
        S
        D
      }
      services {
        childCare
        shopping
        pharmacy
        laundry
        call
        other
        otherText
      }
      isVolunteer
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile(
    $name: String
    $phone: String
    $availability: TimeTableInput
    $dni: String
    $services: ServicesInput
  ) {
    updateProfile(
      name: $name
      phone: $phone
      availability: $availability
      dni: $dni
      services: $services
    ) {
      name
    }
  }
`;
