import fs, { existsSync } from 'fs';

export default class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getProducts () {
        try {
            if (!existsSync(this.filePath)) return [];
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer los productos: ', error);
            return [];
        }
    }
    async getProductById(id) {
        try {
            const products = await this.getProducts()
            const product = products.find( p => p.id === id)
            if (!product) throw new Error(`Producto con id ${id} no encontrado.`)
            return product
        } catch (error) {
            throw new Error(`Error al buscar el producto: ${error.message}`);            
        }
    }
    async addProduct(product) {
        try {
            const { title, description, code, price, status, stock, category, thumbnails} = product
            const products = await this.getProducts()
            
            if (products.some(product => product.code === code)) {
                throw new Error(`Codigo ${code} ya existe.`)
            };
            
            const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            
            const newProduct = {id , title, description, code, price, status, stock, category, thumbnails};
            
            products.push(newProduct)

            await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2))

            return newProduct
        } catch (error) {
            throw new Error(`Error al agregar el producto: ${error.message}`);
            
        }
    }
    async updateProduct(id, updatedProduct) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex( product => product.id === id);

            if (index === -1 ) throw new Error(`Id ${id} no existente.`);
            
            products[index] = {...products[index], ...updatedProduct};

            await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));

            return products[index];        
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);                     
        }

    }
    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const filteredProducts = products.filter( product => product.id !== id)
    
            if (filteredProducts.length === products.length ) throw new Error(`Id ${id} no existe.`);
            await fs.promises.writeFile(this.filePath, JSON.stringify(filteredProducts, null, 2));
            
        } catch (error) {
            throw new Error(`Error al eliminar producto: ${error.message}`);            
        }
    } 
}
