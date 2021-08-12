const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FarmSchema = new Schema({
  name: String,
  description: String,
  state: String,
  town: String,
  address: String,
  zip: String,
  website: String,
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item"
    }
  ]
});

const Farm = mongoose.model("Farm", FarmSchema);

module.exports = Farm;
