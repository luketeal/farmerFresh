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
  const users = await User.insertMany(userData);

  for (newFarm of farms) {
    // randomly add each class to a school
    const tempUser = users[Math.floor(Math.random() * users.length)];
  
    tempUser.farms.push(newFarm._id);
    await tempUser.save();
    // console.log(tempUser);

    // randomly add a professor to each class
    const tempItem = items[Math.floor(Math.random() * items.length)];
    newFarm.items.push(tempItem._id);
    await newFarm.save();

  }

  console.log('all done!');
  process.exit(0);
});
