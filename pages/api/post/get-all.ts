import type { NextApiRequest, NextApiResponse } from "next";
import { PostService } from "../../../server/services/post/post.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { limit } = req.body;

    const posts = await PostService.getAll(limit);

    if (!posts) {
      res.status(400).json(`Error: ${posts}`);

      return;
    }

    res.status(200).json(posts);
  }
}
