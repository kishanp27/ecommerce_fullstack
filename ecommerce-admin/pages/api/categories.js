import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/CategorySchema";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const method = req.method;
  await mongooseConnect();
  await isAdminRequest(req, res);

  const { name, parentCategory, properties } = req.body;

  const propertiesDoc = properties?.map((p) => {
    return {
      name: p.name,
      values: p.values.split(", "),
    };
  });

  if (method === "PUT") {
    const { id } = req.body;
    if (parentCategory === "") {
      const categoryDoc = await Category.findByIdAndUpdate(id, {
        $unset: { parent: 1 },
        name,
        properties: propertiesDoc,
      });
      res.json(categoryDoc);
    } else {
      const categoryDoc = await Category.findByIdAndUpdate(id, {
        name,
        parent: parentCategory,
        properties: propertiesDoc,
      });
      res.json(categoryDoc);
    }
  }

  if (method === "POST") {
    if (parentCategory === "") {
      const categoryDoc = await Category.create({
        name,
        properties,
        properties: propertiesDoc,
      });
      res.json(categoryDoc);
    } else {
      const categoryDoc = await Category.create({
        name,
        parent: parentCategory,
        properties: propertiesDoc,
      });
      res.json(categoryDoc);
    }
  }

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "DELETE") {
    const id = req.query.id;
    const deletedDoc = await Category.findByIdAndDelete(id);
    res.json(deletedDoc);
  }
}
