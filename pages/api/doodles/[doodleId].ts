import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteDoodle,
  getDoodle,
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
      getDoodle(req, res);
      break;
    case 'DELETE':
      deleteDoodle(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
