import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import formidable from "formidable";

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public/images/vouchers");
  form.keepExtensions = true;

  // Ensure the directory exists
  fs.mkdirSync(form.uploadDir, { recursive: true });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload failed" });

    const file = files.file as formidable.File;
    const fileName = fields.fileName as string || file.originalFilename;
    const destPath = path.join(form.uploadDir, fileName);

    fs.rename(file.filepath, destPath, (err) => {
      if (err) return res.status(500).json({ error: "Save failed" });
      return res.status(200).json({ url: `/images/vouchers/${fileName}` });
    });
  });
}