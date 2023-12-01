import type { VercelRequest, VercelResponse } from '@vercel/node'

const handler = async (req: VercelRequest, res: VercelResponse) => {
  res.status(200).json({ status: 'beep boop' })
}

export default handler;