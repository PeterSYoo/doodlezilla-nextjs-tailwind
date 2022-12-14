import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcrypt';
import usersConnect from '../../../database/usersConnect';
import clientPromise from '../../../database/clientPromise';
import Users from '../../../models/Users';

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      /* Fixed Type Error Adding this Block */
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          required: true,
        },
        password: {
          label: 'Password',
          type: 'password',
          required: true,
        },
      },
      /*  */
      async authorize(credentials: any, req) {
        usersConnect().catch((error) => {
          error: 'Connection Failed...!';
        });

        /* Check User Existance */
        const result = await Users.findOne({ name: credentials?.name });
        if (!result) {
          throw new Error('No user found with that Username!');
        }
        /*  */

        /* Compare Passwords */
        const checkPassword = await compare(
          credentials?.password,
          result.password
        );
        /*  */

        /* Incorrect Password */
        if (!checkPassword) {
          throw new Error('Wrong password!');
        }
        /*  */

        return result;
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      return true;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    async jwt({ user, token }: any) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
