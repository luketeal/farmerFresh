const { AuthenticationError } = require('apollo-server-express');

const { Farm, User, Item } = require('../models');
const { populate } = require('../models/Farm');
const { signToken } = require('../utils/auth');
// const {getZips} = require('../utils/getZips');



const resolvers = {
  Query: {

    // query for farms
    farms: async (parent, args) => {
      return Farm.find().populate('items');
    },

    farm: async (parent, { _id }) => {
      return Farm.findOne({ _id }).populate('items');
    },

    farmsByZip: async (parent, { zip }) => {
      return Farm.find({ zip }).populate('items');
    },

    farmsByState: async (parent, { state }) => {
      return Farm.find({ state }).populate('items');
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

    user: async (parent, args, context) => {
      
      if (context.user) {
        console.log(context.user._id)
        const me = await User.findOne({_id: context.user._id }).populate('farms').populate({
          path: 'farms',
          populate: "items"
        })
        console.log(me)
        return me
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    item: async (parent, { _id }) => {
      return Item.findOne({ _id });
    },
    // query for items based on farms
    items: async (parent, args) => {
      return await Item.find({}).populate('users');
    },
  },

  // mutation to add farms
  Mutation: {
  
    addFarm: async(parent, {name, description, state, town, address, website, zip}, context) => {  // addcontext back in.
      
      if (context.user) { //<---- uncomment this when implementing authentication
      let newFarm = await Farm.create(  // changed return farm into variable newFarm. 
        { 
          name: name,
          description: description,
          state: state,
          town: town,
          address: address,
          website: website,
          zip: zip
        });

        // ----- Uncomment these lines when figuring out authentication
        let updatedUser = await User.findOneAndUpdate(     // created updated user variable  to find a user from context.
          {_id: context.user._id},                    // attempting to find user based on the context user object.
          {$addToSet: {farms: newFarm._id}},   // attempting to set the farm to user id.
          {new: true}
          ).populate('farms') // populating the farms array.

          return newFarm    // returning updated farm 
        }
        throw new AuthenticationError('You need to be logged in!');
        // -------------------
        // return newFarm  // <----- Delete this when implementing authentication
    },

    addUser: async(parent, {name, email, password}) => {
      const user = await User.create({name, email, password}); // changed return user into a variable assignment
      const token = signToken(user);        // added token variable be assigned the sign token
      console.log(token);
      return {token, user};            // changed return statement to return the user and the token.

    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });      // need to check if we want login to be email or a username.

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // mutation to add items


    addItem: async(parent, {name, price, count, unit, farmID}, context) => { // added context

      if (context.user) {
      let newItem = await Item.create({ name, price, count, unit});
      let updatedFarm = await Farm.findOneAndUpdate(
        { _id: farmID },
        { $addToSet: { items: newItem._id } },
        { new: true }
      ).populate('items')
      return newItem
      
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // mutation to update farms


    updateFarm:  async(parent, {_id, name, description, state, town, address, website, zip}, context) => {  // added context

      if (context.user) {

      let originalFarm = await Farm.findOne({ _id })
      let updatedFarm = originalFarm
      let edits
      edits = false
      if (originalFarm.name !== name) {
        updatedFarm.name = name
        edits = true
      }
      if (originalFarm.description !== description) {
        updatedFarm.description = description
        edits = true
      }
      if (originalFarm.state !== state) {
        updatedFarm.state = state
        edits = true
      }
      if (originalFarm.town !== town) {
        updatedFarm.town = town
        edits = true
      }
      if (originalFarm.address !== address) {
        updatedFarm.address = address
        edits = true
      }
      if (originalFarm.website !== website) {
        updatedFarm.website = website
        edits = true
      }
      if (originalFarm.zip !== zip) {
        updatedFarm.zip = zip
        edits = true
      }
      if (edits === true) {
        updatedFarm.__v++
      }
      await updatedFarm.save()

      return Farm.findOne({ _id }).populate('items')
    }
    throw new AuthenticationError('You need to be logged in!');
    },

    updateItem:  async(parent, {_id, name, price, count, unit}, context) => {

      if (context.user) {

      let originalItem = await Item.findOne({ _id })
      let updatedItem = originalItem
      let edits
      edits = false
      if (originalItem.name !== name) {
        updatedItem.name = name
        edits = true
      }
      if (originalItem.price !== price) {
        updatedItem.price = price
        edits = true
      }
      if (originalItem.count !== count) {
        updatedItem.count = count
        edits = true
      }
      if (originalItem.unit !== unit) {
        updatedItem.unit = unit
        edits = true
      }
      if (edits === true) {
        updatedItem.__v++
      }

      return await updatedItem.save()
    }

    },

    removeFarm: async (parent, { farmId }, ) => { // added context for auth. context
      // if (context.user) {
      let deletedFarmItems = await Farm.findOne({ _id: farmId });
      let itemArray = deletedFarmItems.items;
      for (deleteItem of itemArray) {
        let deletedItem = await Item.findOneAndDelete({_id: deleteItem })
        
      }
      let deletedFarm = Farm.findOneAndDelete({_id: farmId});
      // return deletedItem
      // }
      // throw new AuthenticationError('You need to be logged in!');
      return deletedFarm
    },

  

    removeItem: async (parent, { farmId, itemId }, context) => {
      if (context.user) {
      let deletedItem = await Item.findOneAndDelete({ _id: itemId });
      await Farm.findOneAndUpdate(
        { _id: farmId },
        { $pull: { items: deletedItem._id } },
        { new: true }
      )
      return deletedItem
      }
      throw new AuthenticationError('You need to be logged in!');  // auth throw
    },

    removeUser: async (parent, { userId}, context) => {    // added context for auth
      if (context.user) {
      return User.findOneAndDelete({_id: userId})
      }
      throw new AuthenticationError('You need to be logged in!'); // auth throw
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

