const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, require: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

userSchema.methods.encryptPassword = async password => {
  return await bcrypt.hash(password, 10);;
};

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', userSchema);
