import { ObjectId } from 'mongodb';
import mongoose, { Schema, model, models } from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    img: {
      type: String,
    },
    image_public_id: {
      type: String,
    },
    video: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [
      {
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        createdAt: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
