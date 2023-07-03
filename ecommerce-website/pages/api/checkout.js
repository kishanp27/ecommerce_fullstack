import { mongooseConnect } from "@/lib/mongoose";
import Order from "@/models/OrderSchema";
import Product from "@/models/ProductSchema";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Hello there!");
    return;
  }

  // console.log(req.body);

  // res.json('ok');

  // return;

  const { name, email, city, postalCode, streetAddress, country, products } =
    req.body;

  await mongooseConnect();

  console.log;

  const productsIds = products;

  const uniqueIds = [...new Set(productsIds)];

  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];

  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );

    const quantity = productsIds.filter((id) => productId === id).length;

    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    ...req.body
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?success=0",
    metadata: { orderId: orderDoc._id.toString() },
  });

  res.json({
    url: session.url
  });
}
