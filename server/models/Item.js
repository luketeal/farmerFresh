const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Change item schema to match new schema
const ItemSchema = new Schema({
    name: String,
    price: String,
    unit: String,
    count: String
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
