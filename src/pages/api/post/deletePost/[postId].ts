import type { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '../../../../../utils/connectMongo';
import User from '../../../../../models/User';
import Post from '../../../../../models/Post';
import cloudinary from '../../../../../utils/cloudinary';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  const post = await Post.findById(req.query.postId);

  let deleteCloudinary;

  console.log(post);
  if (post.video) {
    deleteCloudinary = await cloudinary.uploader.destroy(post.image_public_id, {
      resource_type: 'video',
    });
  } else {
    deleteCloudinary = await cloudinary.uploader.destroy(post.image_public_id);
  }

  console.log('destroyed here', deleteCloudinary);

  const deletedPost = await Post.deleteOne({ _id: req.query.postId });

  res.json({ deletedPost });
}
