// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ProfileService } from "../../../server/services/profile/profile.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const dto = req.body;

    const response = await ProfileService.updateProfile(dto);

    res.status(200).json(response);
  }
}
