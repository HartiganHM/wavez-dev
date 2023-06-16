import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';

import prisma from 'lib/prisma';

const getUser = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const session = await getSession(req, res);
  const userEmail = process.env.DEFAULT_USER || session?.user.email;

  const user = await getUser(userEmail);
  console.log(user);
  console.log(process.env.DEFAULT_USER)

  return {
    user,
    session,
  };
}
