import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../../utils/cloudinary';
import connectMongo from '../../../../utils/connectMongo';
import Post from '../../../../models/Post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case 'POST':
      try {
        const fileStr = req.body.data;
        console.log(fileStr);
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
          folder: 'pet-media',
        });
        console.log('response', req.body.userId);

        const newPost = Post.create({
          userId: req.body.userId,
          img: uploadedResponse.secure_url,
          description: req.body.description,
        });

        res.json({ newPost });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: error });
      }
      break;

    case 'GET':
      const posts = await Post.find();
      res.json({ posts });
      break;
    default:
      break;
  }
}
