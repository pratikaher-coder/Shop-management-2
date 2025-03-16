// Load products from localStorage on page load
document.addEventListener('DOMContentLoaded', loadProducts);

let products = [];

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);

    if (name && price && stock) {
        const product = {
            id: Date.now(),
            name: name,
            price: price,
            stock: stock
        };

        products.push(product);
        saveToLocalStorage();
        updateProductList();
        clearForm();
    }
}

function updateProductList() {
    const tbody = document.getElementById('productList');
    tbody.innerHTML = '';

    products.forEach(product => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    saveToLocalStorage();
    updateProductList();
}

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
        updateProductList();
    }
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productStock').value = '';
}
