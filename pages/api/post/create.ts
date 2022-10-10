import type { NextApiRequest, NextApiResponse } from "next";
import { PostService } from "../../../server/services/post/post.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const post = await PostService.create(req.body);

    if (!post.id) {
      res.status(400).json(`Error: ${post}`);

      return;
    }

    res.status(200).json(post);
  }
}
