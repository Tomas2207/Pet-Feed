import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../utils/cloudinary';
import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  switch (req.method) {
    case 'PATCH':
      try {
        let uploadedResponse;

        if (req.body.img) {
          const fileStr = req.body.img;
          uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'pet-media',
          });

          await User.updateOne({ email: req.body.email }, [
            {
              $set: {
                description: req.body.description,
                name: req.body.petName,
                image: uploadedResponse.secure_url,
              },
            },
          ]);
        }

        await User.updateOne({ email: req.body.email }, [
          {
            $set: {
              description: req.body.description,
              name: req.body.petName,
            },
          },
        ]);

        const updatedUser = await User.findOne({ email: req.body.email });

        console.log(updatedUser);

        res.json({
          updatedUser,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ err: error });
      }
      break;

    case 'GET':
      console.log('query', req.query);

      const posts = await User.findOne({ email: req.query.id });
      res.json({ posts });
      break;
    default:
      break;
  }
}
