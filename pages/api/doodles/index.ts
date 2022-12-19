import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllDoodles,
  postDoodle,
} from '../../../controllers/doodlesController';
import usersConnect from '../../../database/usersConnect';

export default async function doodlesApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'GET':
      getAllDoodles(req, res);
      break;
    case 'POST':
      postDoodle(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
