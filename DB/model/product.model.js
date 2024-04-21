import mongoose, { Schema, Types, model } from 'mongoose';
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            defult: 1,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            defult: 0,
        },
        finalprice: {
            type: Number,
        },
        mainImage: {
            type: Object,
            required: true,
        },
        subImages: [{
            type: Object,
            required: true,
        }],
        numberSellers: {
            type: Number,
            defult: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            default: 'Active',
            enum: ['Active', 'Inactive'],
        },
        colors: [String],
        sizes: [{
            type: String,
            enum: ['s', 'm', '', 'lg', 'xl'],
        }],
        categoryId: { type: Types.ObjectId, ref: 'Category', required: true },
        subcategoryId: { type: Types.ObjectId, ref: 'Subcategory', required: true },
        createdBy: { type: Types.ObjectId, ref: 'User', required: true },
        updatedBy: { type: Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
    }
);
const productModel =
    mongoose.models.Product || model('Product', productSchema);
export default productModel;
