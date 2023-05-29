import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../utils/cloudinary';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fileStr = req.body.data;
    console.log(fileStr);
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'pet-media',
    });
    console.log(uploadedResponse);
    res.json({ msg: 'Yay' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: error });
  }
}
