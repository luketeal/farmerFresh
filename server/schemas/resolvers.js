// const { AuthenticationError } = require('apollo-server-express');

const { Farm, User, Item } = require('../models');
const { populate } = require('../models/Farm');
// const { signToken } = require('../utils/auth');
const {getZips} = require('../utils/getZips');

const resolvers = {
  Query: {
    
    // query for farms basaed on zip
    farms: async (parent, args) => {
        return Farm.find();
    },

    farm: async (parent, { zip }) => {
      return Farm.findOne({ zip });
    },

    // query for farms based on farmer
    farms: async (parent, { name }) => {
        return Farm.findOne({ name }).populate({
          path: 'user',
          populate: 'items'
        });
      },

      farms: async (parent, args) => {
        return await User.find();
      },
    users: async (parent, args) => {
      return User.find();
    },

    item: async (parent, { name }) => {
      return Item.findOne({ name });
    },
    // query for items based on farms
    items: async (parent, args) => {
      return await Item.find({}).populate('users');
    },
  },

// mutation to add farms
  // Mutation: {
  //   addFarm: async(parent, {name, description, state, town, address, zip, website,}) => {
  //     return await Farm.create({ name,description, state, town, address, zip, website});
  //   }
  // },
    Mutation: {
    addFarm: async(parent, {name}) => {
      return await Farm.create({ name});
    }
  },
  
// mutation to add users

// mutation to add items
Mutation: {
  addItem: async(parent, {name, price, count, unit}) => {
    return await Item.create({ name, price, count, unit});
  }
},

// mutation to update farms/users/item


    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
//     me: async (parent, args, context) => {
//       if (context.user) {
//         return User.findOne({ _id: context.user._id });
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },


};

module.exports = resolvers;



// add profiles

