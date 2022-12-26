import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import usersConnect from '../../../database/usersConnect';
import Users from '../../../models/Users';

type Data = {
  name: string;
  email: string;
  password: string;
  _id: string;
  __v: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch((error) => res.json({ error: 'Connection Failed...!' }));

  // only post method is accepted
  if (req.method === 'POST') {
    if (!req.body)
      return res
        .status(404)
        .json({ error: `Don't have form DataTransfer...!` });
    const { name, email, password } = req.body;

    // check duplicate username
    const checkExistingUsername = await Users.findOne({ name });
    if (checkExistingUsername)
      return res.status(422).json({ message: 'Username already exists!' });

    // check duplicate email
    const checkExistingEmail = await Users.findOne({ email });
    if (checkExistingEmail)
      return res.status(422).json({ message: 'Email already exists!' });

    // hash password
    Users.create(
      {
        name,
        email,
        password: await hash(password, 12),
      },
      function (err: Error | null, data: Data) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({ status: true, user: data });
      }
    );
  } else {
    // error status 500
    res
      .status(500)
      .json({ message: 'HTTP method not valid only POST Accepted' });
  }
}
