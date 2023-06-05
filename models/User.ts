import mongoose, { model, models } from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // followers: {
  //   type: Number,
  //   required: true,
  // },
  // following: {
  //   type: Number,
  //   required: true,
  // },
});

const User = models.User || model('User', UserSchema);

export default User;
