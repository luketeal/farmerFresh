
const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type User{
        _id: ID
        name: String!
        email: String!
        password: String!
        state: String
        town: String
        address: String
        zip: Number
        farms:[Farm]
     }

     type Farm{
         _id: ID
         name: String!
         description: String!
         state: String!
         town: String!
         address: String!
         website: String
         zip: Number!
         items: [Item]
         
     }
     type Item{
         _id: ID
         name: String!
         price: Number!
         count: Number!
         unit: String!
     }
   type Auth {
     token: ID!
     user: User,

 }
 
   type Query {
     user: [User]!
     farm: [Farm]!
     item: [Item]!
    
   }
 
   type Mutation {
     add User(name: String!, email: String!, password: String!, state: String!,town: String!, address: String, Zip: Number ): Auth
     login(email: String!): Auth
 
     add Farm(name: String!, email: String!, website: String, description: String!, state: String!, town: String!, address: String!, Zip: Number): Farm
     login(email: String!): Auth
  
     add Item( name: String!,  price: Number!, count: Number!, unit: String! )
    }

 `;

module.exports = typeDefs;