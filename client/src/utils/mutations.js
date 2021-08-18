import { gql } from '@apollo/client';

// ------------------------------------------ added log in user mutation ----------------------------------------------------
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;
// -----------------------------------------------------------------------------------------------------------------------
export const CREATE_FARM = gql`
mutation addFarm(
    $name: String!, 
    $description: String, 
    $state: String!, 
    $town: String!, 
    $address: String!, 
    $website: String!, 
    $zip:String!
  ) {
  addFarm(
    name: $name
  	description: $description
    state: $state
    town: $town
    address: $address
    website: $website
    zip: $zip
  ) {
  _id
  name
  description
  state
  town
  address
  website
  zip
  }
}
`;

export const CREATE_ITEM = gql`
mutation addNewItem(
    $name: String!, 
    $price: String!, 
    $unit: String!,
    $count: String!,
    $farmID: ID!,
  ) {
  addItem(
    name: $name
  	price: $price
    unit: $unit
    count: $count
    farmID: $farmID
  ) {
    _id
    name
    price
    count
    unit
    }
}
`;

export const CREATE_USER = gql`
mutation addNewUser(
    $name: String!, 
    $email: String!, 
  	$password: String!,
  ) {
  addUser(
    name: $name
  	email: $email
    password: $password
  ) {
    token
    user {
      _id
      name
      email
      password
    }
  }
}
`;

export const UPDATE_FARM = gql`
mutation updateOneFarm(
    $_id: ID!,
  $name: String, 
  $description: String, 
  $state: String, 
  $town: String, 
  $address: String, 
  $website: String, 
  $zip:String
) {
updateFarm(
  _id: $_id
  name: $name
    description: $description
  state: $state
  town: $town
  address: $address
  website: $website
  zip: $zip
) {
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

export const UPDATE_ITEM = gql`
mutation updateOneItem(
    $_id: ID!,
$name: String, 
$price: String, 
$count: String, 
$unit: String,
) {
updateItem(
_id: $_id
name: $name
 price: $price
count: $count
unit: $unit
) {
_id
name
price
count
unit
}
}
`;

export const REMOVE_FARM = gql`
mutation removeFarm($farmId: ID!) {
  removeFarm(farmId: $farmId) {
  _id
  name
  description
  state
  town
  address
  website
  zip
  }
}`;