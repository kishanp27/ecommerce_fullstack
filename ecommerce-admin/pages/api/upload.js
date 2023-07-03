import multiparty from "multiparty";
import { v2 as cloudinary } from "cloudinary";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handle(req, res) {

  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const links = [];
  
  for(const file of files.file){
    const newFilename = Date.now();
    const filePath = file.path;

    const response = await cloudinary.uploader.upload(filePath,{
        resource_type: 'image',
        public_id: newFilename,
        folder: 'next-ecommerce',
        use_filename: false
    })

    links.push(response.url);
  }
  res.json({links});
}

export const config = {
  api: { bodyParser: false },
};
