import mongoose, { Schema, model, models } from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = models.Post || model('Post', postSchema);

export default Post;
