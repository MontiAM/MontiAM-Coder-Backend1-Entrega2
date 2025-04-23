import { Router } from 'express'
import ProductManager from '../services/ProductManager.js'

const router = Router()
const productManager = new ProductManager('./data/products.json')
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.status(200).json({msg: 'Listado de productos: ', data: products})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body
        const product = await productManager.addProduct(newProduct)
        res.status(201).json({msg: 'Productos agregado exitosamente.', data: product})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const product = await productManager.getProductById(productId)        
        res.status(200).json({msg: 'Producto: ', data: product})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
router.put('/:pid', async (req, res) => {
    try {
        const prodID = parseInt(req.params.pid);
        const data  = req.body;
        const updatedProduct = await productManager.updateProduct(prodID, data)
        res.status(200).json({msg: 'Producto actualizado exitosamente.', data: updatedProduct})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const product = await productManager.deleteProduct(productId)
        res.status(200).json({msg: 'Productos eliminado exitosamente.', data: product})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default router;
