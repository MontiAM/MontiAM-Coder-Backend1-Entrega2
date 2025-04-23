const socket = io();

socket.on("server:productadded", (newProduct) => {
  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: `El producto "${newProduct.title}" fue agregado correctamente`,
    confirmButtonText: "OK",
  });
});

socket.on("server:loadproducts", (products, newProduct) => {
  if (newProduct) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Nuevo producto disponible: ${newProduct.title}`,
      showConfirmButton: false,
      timer: 2500,
    });
  }
  renderProducts(products);
});

socket.on("server:error", ({ event, message }) => {
  Swal.fire({
    icon: "warning",
    title: `Error`,
    text: `${message}`,
    confirmButtonText: "OK",
  });
});

const postProduct = (product) => {
  socket.emit("client:postproduct", product);
};
