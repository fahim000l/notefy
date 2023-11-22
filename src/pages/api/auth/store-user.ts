import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import User, { DTUser } from "@/models/User";
import connectMongo from "@/configs/db.config";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo().catch((err) =>
      res.status(500).json({ error: "DB Connection Failed!!" })
    );
    const { method, body } = req;

    if (method === "POST") {
      if (!body) {
        return res.status(404).json({ error: "Invalid Body" });
      } else {
        const userInfo: DTUser = {
          email: body?.email,
          password: await hash(body?.password, 12),
          userName: body?.userName,
          profilePic: body?.profilePic,
        };

        const result = await User?.create(userInfo);

        return res.status(200).json({ success: true, result });
      }
    } else {
      return res
        .status(500)
        .json({ error: `Http ${method} request is not allowed for this API` });
    }
  } finally {
  }
}
