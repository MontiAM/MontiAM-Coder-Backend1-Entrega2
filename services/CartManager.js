import fs, { existsSync } from 'fs';
import ProductManager from './ProductManager.js';
export default class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.productManager = new ProductManager('./data/products.json');
    }
    async getCarts(){
        try {
            if (!existsSync(this.filePath)) return [];
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data)
        } catch (error) {
            throw new Error(`Error al leer los carritos: ${error.message}`);            
        }
    }
    async createCart() {
        try {
            const carts = await this.getCarts();            
            const id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
            
            const newCart = { id, products: []};
            carts.push(newCart);

            await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
            return newCart
        } catch (error) {            
            throw new Error(`Error al crear el carrito: ${error.message}`);         
        }
    }
    async getCartById (id) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === id) 
            if (!cart) throw new Error(`Carrito con id ${id} no encontrado.`)

            if (cart.products.length === 0) return { ...cart, products: [] };

            const allProducts = await this.productManager.getProducts();
            const cartProducts = cart.products.map( product => {
                const productData = allProducts.find( p => p.id === product.id);
                return { ...productData, quantity: product.quantity}
                 
            })
            return {...cart, products: cartProducts}
        } catch (error) {
            throw new Error(`Error al buscar el carrito: ${error.message}`);
        }
    }
    async addProductToCart(cartId, productId, quantity){
        try {        
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex( c => c.id === cartId);
            if ( cartIndex === -1) throw new Error(`Carrito con id ${cartId} no encontrado`);

            const product = await this.productManager.getProductById(productId);
            if (!product) throw new Error(`Producto con id ${productId} no encontrado.`);
            if (quantity < 0 || quantity === undefined) throw new Error('Cantidad indefinida o menor a 0');

            const productIndex = carts[cartIndex].products.findIndex( p => p.id === productId)

            if (productIndex === -1) {
                carts[cartIndex].products.push({id: productId, quantity: quantity })
            } else {
                carts[cartIndex].products[productIndex].quantity += quantity;
            }

            await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2))
            return carts[cartIndex]

        } catch (error) {
            throw new Error(`Error al agregar producto al carrito: ${error.message}`);           
        }
    }
    async removeProductFromCart(cartId, productId){
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex( cart => cart.id === cartId);
                        
            if ( cartIndex === -1) throw new Error(`Carrito con id: ${cartId} no encontrado`);

            carts[cartIndex].products = carts[cartIndex].products.filter(p => p.id !== productId);

            await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
            return carts[cartIndex];
            
        } catch (error) {
            throw new Error(`Error al eliminar producto del carrito: ${error.message}`);           
        }
    }
}
