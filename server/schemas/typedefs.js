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
        zip: String
        
     }
  
     type Farm{
         _id: ID
         name: String!
         description: String!
         state: String!
         town: String!
         address: String!
         website: String
         zip: String!
      
         
     }
     
   type Query {
 
    farm: [Farm]!
    farms: [Farm]
    user: [User]!
    users: [User]
   }
 
  

 `;

module.exports = typeDefs;



// type Mutation {
//     addUser(name: String!, email: String!, password: String!, state: String!,town: String!, address: String, Zip: Number ): Auth
//     login(email: String!): Auth

//     addFarm(name: String!, email: String!, website: String, description: String!, state: String!, town: String!, address: String!, Zip: Number): Farm
//     login(email: String!): Auth
 
//     addItem( name: String!,  price: Number!, count: Number!, unit: String! )
//    }







// type Item{
//     _id: ID
//     name: String!
//     price: Number!
//     count: Number!
//     unit: String!
// }
// type Auth {
// token: ID!
// user: User,

// }


// type Query {
//     user: [User]!
//     farm: [Farm]!
//     item: [Item]!
   
//   }