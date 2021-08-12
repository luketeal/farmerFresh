// const { AuthenticationError } = require('apollo-server-express');

const { Farm, User, Item } = require('../models');
const { populate } = require('../models/Farm');
// const { signToken } = require('../utils/auth');
// const {getZips} = require('../utils/getZips');



const resolvers = {
  Query: {
    
    // query for farms
    farms: async (parent, args) => {
        return Farm.find().populate('items');
    },

    farm: async (parent, { zip }) => {
      return Farm.findOne({ zip }).populate('items');
    },

    farmsByZip: async (parent, { zip }) => {
      return Farm.find({ zip }).populate('items');
    },

    // query for farms based on farmer
    // farms: async (parent, { name }) => {
    //     return Farm.findOne({ name }).populate({
    //       path: 'user',
    //       populate: 'items'
    //     });
    //   },

    //   farms: async (parent, args) => {
    //     return await User.find();
    //   },
    users: async (parent, args) => {
      return User.find();
    },

    user: async (parent, {name}) => {
      return User.findOne({name}).populate('farms').populate({
        path: 'farms',
        populate: 'items'
      })
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
  Mutation: {
    addFarm: async(parent, {name, description, state, town, address, website, zip}) => {
      return await Farm.create(
        { 
          name: name,
          description: description, 
          state: state, 
          town: town, 
          address: address, 
          website: website, 
          zip: zip
        });
    },
  
// mutation to add users

    addUser: async(parent, {name, email, password, state, town, address, zip}) => {
      return await User.create({name, email, password, state, town, address, zip})
    },

// mutation to add items

    addItem: async(parent, {name, price, count, unit, farmID}) => {
      let newItem = await Item.create({ name, price, count, unit});
      let updatedFarm = await Farm.findOneAndUpdate(
        {_id: farmID},
        {$addToSet: {items: newItem._id}},
        {new: true}
        ).populate('items')
      return updatedFarm
    },

    // mutation to update farms

    updateFarm:  async(parent, {_id, name, description, state, town, address, website, zip}) => {
      let originalItem = await Farm.findOne({ _id })
      let updatedItem = originalItem
      let edits
      edits = false
      if(originalItem.name !== name) {
        updatedItem.name = name
        edits = true
      }
      if(originalItem.description !== description) {
        updatedItem.description = description
        edits = true
      }
      if(originalItem.state !== state) {
        updatedItem.state = state
        edits = true
      }
      if(originalItem.town !== town) {
        updatedItem.town = town
        edits = true
      }
      if(originalItem.address !== address) {
        updatedItem.address = address
        edits = true
      }
      if(originalItem.website !== website) {
        updatedItem.website = website
        edits = true
      }
      if(originalItem.zip !== zip) {
        updatedItem.zip = zip
        edits = true
      }
      if(edits === true) {
        updatedItem.__v++
      }
      await updatedItem.save()

      return Farm.findOne({ _id }).populate('items')
    }

},



// mutation to update users

// mutation to update items


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

