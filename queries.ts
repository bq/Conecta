import gql from "graphql-tag";

export const ME_QUERY = gql`
  query Me {
    me {
      email
      name
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

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile(
    $name: String
    $phone: String
    $availability: TimeTableInput
  ) {
    updateProfile(name: $name, phone: $phone, availability: $availability) {
      name
    }
  }
`;
