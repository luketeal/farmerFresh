const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  state: String,
  town: String,
  address: String,
  zip: Number,
  farms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Farm"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
