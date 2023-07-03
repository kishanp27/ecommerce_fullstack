import { Schema, model, models } from "mongoose";


const OrderSchema = new Schema({
    line_items: [{type: Object}],
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    paid: {type: Boolean, default: false}
}, {
    timestamps: true,
})

const Order = models?.order || model('order', OrderSchema);

export default Order;