import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../../utils/cloudinary';
import connectMongo from '../../../../utils/connectMongo';
import Post from '../../../../models/Post';
import User from '../../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case 'POST':
      try {
        const fileStr = req.body.data;

        let newPost;

        if (req.body.type === 'image') {
          const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'pet-media',
          });

          newPost = Post.create({
            userId: req.body.userId,
            img: uploadedResponse.secure_url,
            image_public_id: uploadedResponse.public_id,
            description: req.body.description,
          });
        } else if (req.body.type === 'video') {
          const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'pet-media',
            resource_type: 'video',
          });

          newPost = Post.create({
            userId: req.body.userId,
            video: uploadedResponse.secure_url,
            image_public_id: uploadedResponse.public_id,
            description: req.body.description,
          });
        }

        res.json({ newPost });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: error });
      }
      break;

    case 'GET':
      let posts = await Post.find()
        .populate({ path: 'userId', model: User })
        .populate({ path: 'comments.author', model: User })
        .populate({ path: 'likes', model: User });

      posts = posts.reverse();
      res.json({ posts });
      break;
    default:
      break;
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};
