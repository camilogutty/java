// Obteniendo el formulario y la lista de productos
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const submitButton = document.getElementById('submitButton');
const updateButton = document.getElementById('updateButton');
const cancelButton = document.getElementById('cancelButton');

let products = [];
let currentIndex = -1;

// Función para agregar un producto
function addProduct(name, price) {
    const product = { name, price };
    products.push(product);
    renderProductList();
}

// Función para actualizar un producto
function updateProduct(index, name, price) {
    products[index].name = name;
    products[index].price = price;
    resetForm();
    renderProductList();
}

// Función para renderizar la lista de productos
function renderProductList() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productRow = document.createElement('tr');
        productRow.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
        productList.appendChild(productRow);
    });
}

// Función para eliminar un producto
function deleteProduct(index) {
    products.splice(index, 1);
    renderProductList();
}

// Función para editar un producto
function editProduct(index) {
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    currentIndex = index;
    submitButton.classList.add('d-none');
    updateButton.classList.remove('d-none');
    cancelButton.classList.remove('d-none');
}

// Función para resetear el formulario
function resetForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    currentIndex = -1;
    submitButton.classList.remove('d-none');
    updateButton.classList.add('d-none');
    cancelButton.classList.add('d-none');
}

// Event listener para el formulario
productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);

    if (currentIndex === -1) {
        addProduct(name, price);
    } else {
        updateProduct(currentIndex, name, price);
    }

    resetForm();
});

// Event listener para cancelar la edición
cancelButton.addEventListener('click', resetForm);
