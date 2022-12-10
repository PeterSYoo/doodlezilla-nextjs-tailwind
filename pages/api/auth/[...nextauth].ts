import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import usersConnect from '../../../database/usersConnect';
import Users from '../../../models/Users';
import { compare } from 'bcrypt';

export const authOptions: any = {
  providers: [
    // @ts-ignore
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials: any, req) {
        usersConnect().catch((error) => {
          error: 'Connection Failed...!';
        });

        // check user existance
        const result = await Users.findOne({ username: credentials?.username });
        if (!result) {
          throw new Error('No user found with that Username!');
        }

        // compare
        const checkPassword = await compare(
          credentials?.password,
          result.password
        );

        // incorrect password
        if (!checkPassword) {
          throw new Error('Wrong password!');
        }

        return result;
      },
    }),
  ],
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
