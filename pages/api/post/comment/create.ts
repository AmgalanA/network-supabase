import type { NextApiRequest, NextApiResponse } from "next";
import { CommentService } from "../../../../server/services/post/comment/comment.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const comment = await CommentService.create(req.body);

    if (!comment.id) {
      res.status(400).json(`Error: ${comment}`);

      return;
    }

    res.status(200).json(comment);
  }
}
