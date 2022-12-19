import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteDoodle,
  getDoodle,
  putDoodle,
} from '../../../controllers/doodlesController';
import usersConnect from '../../../database/usersConnect';

export default async function doodleIdApi(
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
    case 'PUT':
      putDoodle(req, res);
      break;
    case 'DELETE':
      deleteDoodle(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
