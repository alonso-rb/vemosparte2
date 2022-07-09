const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');

const UserSchema = new Mongoose.Schema({
        name: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        phone: {type: String, required: true, unique: true},
        email: {type: String, required: true}
});

UserSchema.pre("save", async function (next) {
  const user = this;
  // Auto-generate Salt, and 10 salt rounds
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  };

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;