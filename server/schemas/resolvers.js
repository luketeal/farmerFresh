// const { AuthenticationError } = require('apollo-server-express');
// const { User } = require('../models');
const { Farm, User } = require('../models');
// const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // profiles: async () => {
    //   return Profile.find();     // Commented out because no need of finding all users
    // },



    // ----------------------------------------------------------------------------------------
    // user: async (parent, { userId }) => {
    //   return User.findOne({ _id: userId });
    // },
    // ----------------------------------------------------------------------------------------------------------------------------
    
    // query for farms basaed on zip
    farms: async (parent, args) => {
        return Farm.find();
    },

    // query for farms based on farmer
    user: async (parent, { name }) => {
        return User.findOne({ name });
      },

      users: async (parent, args) => {
        return User.find();
    },
    // query for items based on farms

// mutation to add farms

// mutation to add users

// mutation to add items

// mutation to update farms/users/items




    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
//     me: async (parent, args, context) => {
//       if (context.user) {
//         return User.findOne({ _id: context.user._id });
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
  },







};

module.exports = resolvers;



// add profiles

