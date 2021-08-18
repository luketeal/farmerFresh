const { gql } = require('apollo-server-express');

// added password got user type def
const typeDefs = gql`


type User{

        _id: ID
        name: String
        email: String
        password: String
        farms:[Farm]
}
  
type Farm{

    _id: ID
    name: String
    description: String
    state: String
    town: String
    address: String
    website: String
    zip: String
    items: [Item]
    
}

type Item{
    _id: ID
    name: String
    price: String
    count: String
    unit: String
}

type Auth {
    token: ID!
    user: User
  }
 
     
type Query {
 
    farm(_id: ID!): Farm
    farms: [Farm]
    farmsByZip (zip: [String!]): [Farm]
    user: User
    users: [User]
    item(_id: String!): Item
    items: [Item]
    farmsByState (state: String!): [Farm]
}
   
  
type Mutation {
    
    addFarm(name: String!, description: String, state: String!, town: String!, address: String!, website: String!, zip: String!): Farm
    addItem(name: String!, price: String!, count: String!, unit: String!, farmID: ID!): Item
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateFarm(_id: ID!, name: String, description: String, state: String, town: String, address: String, website: String, zip: String): Farm
    updateItem(_id: ID!, name: String, price: String, count: String, unit: String): Item
    removeFarm(farmId: ID!): Farm
    removeItem(itemId: ID!, farmId: ID!): Item
    removeUser(userId: ID!): User
}


 `;

module.exports = typeDefs;





//8/14/21 -----  Added login to type def and  changed User to Auth for add user.





// ---------------------------------------    addFarm(name: String!, email: String!, website: String, description: String!, state: String!, town: String!, address: String!, Zip: String): Farm
// addUser(): User 
// updateFarm(): Farm
// updateUser(): User
// updateItem(): Item
// deleteFarm(): ???
// deleteUser(): ???
// deleteItem(): ???

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







// type Query {
//     user: [User]!
//     farm: [Farm]!
//     item: [Item]!

//   }
// login(email: String!)

// add Farm(name: String!, email: String!, website: String, description: String!, state: String!, town: String!, address: String!, Zip: String): Farm
// login(email: String!)

// add Item( name: String!,  price: String!, count: String!, unit: String! )
