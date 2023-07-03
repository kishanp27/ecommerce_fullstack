import { mongooseConnect } from "@/lib/mongoose";
import Order from "@/models/OrderSchema";
const stripe = require("stripe")(process.env.STRIPE_SK);

import { buffer } from "micro";


const endpointSecret = "whsec_323c491b397b460e701784d5bc16fd14f4290d62d810137312e1a8d74ea6455c";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err[message]}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded)
      const orderId = paymentIntentSucceeded.metadata.orderId;
      const paid = paymentIntentSucceeded.payment_status === 'paid';

      if(orderId && paid){
        await Order.findByIdAndUpdate(orderId, {
            paid: true
        })
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
}

export const config = {
    api: {bodyParser: false}
}
