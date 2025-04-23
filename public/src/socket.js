const socket = io();

socket.on("server:loadproducts", (products, newProduct) => {
  if (newProduct) {
    alert(`Producto "${newProduct.title}" cargado exitosamente.`);
  }
  renderProducts(products);
});

socket.on("server:error", ({ event, message }) => {
  console.error(`❌ Error en el evento "${event}": ${message}`);
  alert(`Error en "${event}": ${message}`);
});

const postProduct = (product) => {
  socket.emit("client:postproduct", product);
};
