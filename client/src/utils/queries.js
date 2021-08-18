import { gql } from '@apollo/client';

export const QUERY_FARMS = gql`
query allFarmsByZip($zip: [String!]) {
    farmsByZip(zip: $zip) {
      _id
      name
      description
      state
      town
      address
      website
      zip
      items {
        _id
        name
        price
        count
        unit
      }
    }
  }
`;

export const ALL_FARMS = gql`
query {
  farms {
  state
}

}
`;

export const FARMS_BY_STATE = gql `
query allFarmsByState($state: String!) {
  farmsByState(state: $state) {
    _id
    name
    description
    state
    town
    address
    website
    zip
    items {
      _id
      name
      price
      count
      unit
    }
  }
}

`

export const FARMS_BY_ID = gql `
query farmByID($_id: ID!) {
  farm(_id: $_id) {
    _id
    name
    description
    state
    town
    address
    website
    zip
    items {
      _id
      name
      price
      count
      unit
    }
  }
}

`

export const USER_BY_ID = gql `
query user{
  user {
    _id
    name
    email
    farms {
      _id
      name
      description
      state
      town
      address
      website
      zip
      items {
        _id
        name
        price
        count
        unit
      }
    }
  }
}

`
