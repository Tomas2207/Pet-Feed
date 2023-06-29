import mongoose, { model, models, Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  image_public_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

const User = mongoose.model('User', UserSchema);

export default User;
