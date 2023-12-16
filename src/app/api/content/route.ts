import { PrismaClient, content, link, social } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'
export async function GET() {
  const content = await prisma.content.findFirst({
    include: {
      links: true,
      socials: true,
    },
  });
  return NextResponse.json<content & {links: link[], socials: social[]}>(content as content & {links: link[], socials: social[]});
}