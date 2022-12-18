import { NextApiRequest, NextApiResponse } from 'next';
import usersConnect from '../../../database/usersConnect';
import Users from '../../../models/Users';
import { hash } from 'bcrypt';

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
    const { username, email, password } = req.body;

    // check duplicate username
    const checkExistingUsername = await Users.findOne({ username });
    if (checkExistingUsername)
      return res.status(422).json({ message: 'Username already exists!' });

    // check duplicate email
    const checkExistingEmail = await Users.findOne({ email });
    if (checkExistingEmail)
      return res.status(422).json({ message: 'Email already exists!' });

    // hash password
    Users.create(
      {
        username,
        email,
        password: await hash(password, 12),
      },
      function (err: Error | null, data: any) {
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
