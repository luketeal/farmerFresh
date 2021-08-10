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
        farms:[Farm]
     }
  
     type Farm{
         _id: ID
         name: String!
         description: String
         state: String!
         town: String!
         address: String!
         website: String
         zip: String!
         items: [Item]
         
     }
     type Item{
         _id: ID
         name: String!
         price: String!
         count: String!
         unit: String!
     }
 
     
   type Query {
 
    farm: [Farm]!
    farms: [Farm]
    user: [User]!
    users: [User]
    item: [Item]!
    items: [Item]
   }
   
  
   type Mutation {
     
    
     addFarm(name: String!, email: String!, website: String, description: String!, state: String!, town: String!, address: String!, Zip: String): Farm
    

      addItem(name: String!, price: String!, Count: String!, Unit: String!): Item
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

// add User(name: String!, email: String!, password: String!, state: String!,town: String!, address: String, Zip: String )

 //  type Auth {
  // token: ID!
  // user: User,

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
// login(email: String!)

// add Farm(name: String!, email: String!, website: String, description: String!, state: String!, town: String!, address: String!, Zip: String): Farm
// login(email: String!)

// add Item( name: String!,  price: String!, count: String!, unit: String! )