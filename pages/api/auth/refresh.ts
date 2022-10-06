import type { NextApiRequest, NextApiResponse } from "next";

import { AuthService } from "../../../server/services/auth/auth.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { refreshToken }: { refreshToken: string } = req.body;

  const response = await AuthService.refresh(refreshToken);

  if (!response) {
    res.status(403).json("Not Authorized.");

    return;
  }

  res.status(200).json(response);
}
