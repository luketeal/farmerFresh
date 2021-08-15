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
query allFarms() {
farms {
  zip
}

}
`;
