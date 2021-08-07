
 const { gql } = require('apollo-server-express');

 const typeDefs = gql`
   type User{
     
     name: String!
     email: String!
     state: String
     town: String
     address: String
     zip: Number
 farms: [String]
     }

     type Farm{
         name: String!
         email: String!
         state: String!
         town: String!
         address: String!
         Zip: Number
     }
     type Item{
         name: String!
         count: Number!
         weight: Number!

     }
   type Auth {
     token: ID!
     : User,
     : Farm,
   }
 
   type Query {
     user: [User]!
     farm: [Farm]!
     item: [Item]!
    
   }
 
   type Mutation {
     add User(name: String!, email: String!, state: String!,town: String!, address: String, Zip: Number ): Auth
     login(email: String!): Auth
 
     add Farm(name: String!, email: String!, state: String!, town: String!, address: String!, Zip: Number): Farm
     login(email: String!): Auth
  
     add Item( name: String!, count: Number!, weight: Number! )
    }

 `;
 
 module.exports = typeDefs;