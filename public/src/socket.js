const socket = io();

socket.on("server:error", ({ event, message }) => {
  Swal.fire({
    icon: "warning",
    title: `Error`,
    text: `${message}`,
    confirmButtonText: "OK",
  });
});

socket.on("server:loadproducts", (products, newProduct, deletedProduct) => {
  if (newProduct) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Nuevo producto disponible: ${newProduct.title}`,
      showConfirmButton: false,
      timer: 2500,
    });
  }
  if (deletedProduct) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Se elimino producto: ${deletedProduct.title}`,
      showConfirmButton: false,
      timer: 2500,
    });
  }
  renderProducts(products);
});

socket.on("server:productadded", (newProduct) => {
  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: `El producto "${newProduct.title}" fue agregado correctamente`,
    confirmButtonText: "OK",
  });
});

socket.on("server:productdeleted", ({msg}) => {
  Swal.fire({
    icon: "success",
    text: `${msg}`,
    confirmButtonText: "OK",
  });
});


const postProduct = (product) => {
  socket.emit("client:postproduct", product);
};

const deleteProduct = (productId) => {
  socket.emit("client:deleteproduct", productId)
}
