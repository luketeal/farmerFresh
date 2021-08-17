const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  farms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Farm"
    }
  ]
});


const User = mongoose.model("User", UserSchema);

module.exports = User;
