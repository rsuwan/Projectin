import cartModel from "../../../DB/model/cart.model.js";

export const CraeteCart = async (req, res, next) => {
    const { productId, quantity } = req.body;
    const cart = await cartModel.findOne({ userId: req.user._id });
    if (!cart) {
        const naewCart = await cartModel.create({
            userId: req.user._id,
            products: { productId, quantity }
        })
        return res.status(201).json({ message: "success", naewCart });
    }
    let matchedProduct = false;
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].productId == productId) {
            cart.products[i].quantity = quantity;
            matchedProduct = true;
            break;
        }
    }
    if (!matchedProduct) {
        cart.products.push({ productId, quantity });
    }
    await cart.save();
    return res.status(201).json({ message: "success", cart });
};
export const RemoveItem = async (req, res, next) => {
    const { productId } = req.body;
    await cartModel.updateOne({ userId: req.user._id }, {
        $pull: {
            products: {
                productId
            }
        }
    })
    return res.status(201).json({ message: "success" });
};
export const ClearCart = async (req, res, next) => {
    const clearCart = await cartModel.updateOne({ userId: req.user._id }, { products: [] });
    return res.status(201).json({ message: "success" });
};
export const GetCart = async (req, res, next) => {
    const cart = await cartModel.findOne({ userId: req.user._id });
    return res.status(201).json({ message: "success", cart });
};
