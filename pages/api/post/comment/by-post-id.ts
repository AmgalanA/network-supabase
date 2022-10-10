import type { NextApiRequest, NextApiResponse } from "next";
import { CommentService } from "../../../../server/services/post/comment/comment.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { postId } = req.query;
    console.log("Query: ", req.query);

    if (postId) {
      const comments = await CommentService.byPostId(+postId);

      if (!comments) {
        return;
      }

      res.status(200).json(comments);
    }
    res.status(400).json("No comment id provided.");
  }
}
