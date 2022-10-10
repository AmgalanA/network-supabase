// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProfileService } from '../../../server/services/profile/profile.service';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { id } = req.query;

    if (id) {
        const profile = await ProfileService.byId(+id);

        res.status(200).json(profile);
    }

    res.status(400).json('No id provided.')
}
