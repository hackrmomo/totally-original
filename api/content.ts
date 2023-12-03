import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(request: VercelRequest, response: VercelResponse ) {
  switch (request.method) {
    case 'GET':
      const content = await prisma.content.findFirst({
        include: {
          links: true,
          socials: true,
        },
      });
      response.status(200).json(content);
      break;
    default:
      response.status(405).end(); // Method Not Allowed
      break;
  }
}
