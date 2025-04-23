import { Router } from "express"
import CartManager from "../services/CartManager.js"

const router = Router()
const cartManager = new CartManager('./data/cart.json')
router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart()
        res.status(201).json({msg: 'Carrito creado exitosamente.', data: cart})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const cart = await cartManager.getCartById(cartId)
        res.status(200).json({msg: 'Listado de productos: ', data: cart})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity;
        const cart = await cartManager.addProductToCart(cartId, productId, quantity);
        res.status(201).json({msg: 'Carrito creado exitosamente.', data: cart});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const prodId = parseInt(req.params.pid);
        const cartId = parseInt(req.params.cid);
        const removedProduct = await cartManager.removeProductFromCart(cartId, prodId)
        res.status(200).json({msg: 'Producto eliminado de carrito.', data: removedProduct})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default router;