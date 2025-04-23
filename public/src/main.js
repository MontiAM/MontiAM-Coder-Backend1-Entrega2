const productForm = document.getElementById('product-form')

productForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const status = document.getElementById('status').checked;
    const thumbnail1 = ['']
    // const thumbnail1 = document.getElementById('thumbnail1').value;    

    const product = {title, description,code, price, stock, category, status, thumbnail1}
    postProduct(product)
})