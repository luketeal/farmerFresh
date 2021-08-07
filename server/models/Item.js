const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    price: Number,
    unit: String,
    count: Number, 
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
