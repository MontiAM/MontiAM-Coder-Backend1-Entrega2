import ProductManager from "../services/ProductManager.js";

const productManager = new ProductManager("./data/products.json");

const emitError = (socket, event, error) => {
  console.error(`❌ ${event} - Error:`, error.message);
  socket.emit("server:error", { event, message: error.message });
};

const configSockets = (io) => {
  io.on("connection", async (socket) => {
    console.log(`nuevo usuario conectado: ${socket.id}`);

    try {
      const products = await productManager.getProducts();
      socket.emit("server:loadproducts", products);
    } catch (error) {
      emitError(socket, "loadproducts", error);
    }

    socket.on("client:postproduct", async (data) => {
      try {
        const newProduct = await productManager.addProduct(data);
        const products = await productManager.getProducts();
    
        socket.broadcast.emit("server:loadproducts", products, newProduct);
    
        socket.emit("server:productadded", newProduct);
      } catch (error) {
        emitError(socket, "postproduct", error);
      }
    });
  });
};

export default configSockets;
