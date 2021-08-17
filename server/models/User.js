const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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

// set up pre-save middleware to create password
UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = mongoose.model("User", UserSchema);

module.exports = User;
