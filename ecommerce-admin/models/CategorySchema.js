const { Schema, model, models, Types } = require("mongoose");

const CategorySchema = new Schema({
    name: {type: String, required: true},
    parent: {type: Types.ObjectId, ref:'category'},
    properties: [{name: String, values: [String]}]
});

const Category = models?.category || model('category', CategorySchema);

export default Category;