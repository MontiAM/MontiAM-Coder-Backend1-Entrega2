const renderProduct = (product) => {
    const div = document.createElement('div');
    div.classList.add('product-card');
  
    div.innerHTML = `
      <h3>${product.title}</h3>
      <p><strong>Descripción:</strong> ${product.description}</p>
      <p><strong>Código:</strong> ${product.code}</p>
      <p><strong>Precio:</strong> $${product.price}</p>
      <p><strong>Stock:</strong> ${product.stock}</p>
      <p><strong>Categoría:</strong> ${product.category}</p>
      <p><strong>Estado:</strong> ${product.status ? 'Disponible' : 'No disponible'}</p>      
      <hr>
    `;

    // ${product.thumbnails?.map(url => `<img src="/images/${url}" alt="${product.title}" width="100">`).join('')}
  
    return div;
  };

  const renderProducts = (products) => {
    const list = document.getElementById('product-list');
    if (!list) return;
  
    list.innerHTML = ''; 
    products.forEach(product => {
      const productElement = renderProduct(product);
      list.appendChild(productElement);
    });
  };