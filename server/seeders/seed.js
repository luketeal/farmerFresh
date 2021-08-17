const db = require('../config/connection');
const { Farm, User, Item} = require('../models');

const farmData = require('./farmSeeds.json');
const itemData = require('./itemSeeds.json');
const userData = require('./userSeeds.json');

db.once('open', async () => {
  // clean database
  await Farm.deleteMany({});
  await Item.deleteMany({});
  await User.deleteMany({});

  // bulk create each model
  const farms = await Farm.insertMany(farmData);
  const items = await Item.insertMany(itemData);
  for (newUser of userData) {
    await User.create(newUser)
  }

  for (newFarm of farms) {
    // randomly add each class to a school
    const users = await User.find()
    const tempUser = users[Math.floor(Math.random() * users.length)];
  
    tempUser.farms.push(newFarm._id);
    await tempUser.save();
    // console.log(tempUser);

    // randomly add a professor to each class


  }

  for (newItem of items) {

    const tempFarm = farms[Math.floor(Math.random() * farms.length)];
    tempFarm.items.push(newItem._id);
    await tempFarm.save();
  }

  console.log('all done!');
  process.exit(0);
});



