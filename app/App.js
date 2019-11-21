// Product Constructor
class Product {
    constructor(name, cantidad, color) {
        this.name = name;
        this.cantidad = cantidad;
        this.color = color;
    }
}

// UI Constructor
class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Producto</strong>: ${product.name} -
                    <strong>Cantidad</strong>: ${product.cantidad} - 
                    <strong>Color</strong>: ${product.color}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado correctamente', 'success');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Show in The DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        // Insert Message in the UI
        container.insertBefore(div, app);
        // Remove the Message after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function (e) {

        const name = document.getElementById('name').value,
            cantidad = document.getElementById('cantidad').value,
            color = document.getElementById('color').value;

        // Create a new Oject Product
        const product = new Product(name, cantidad, color);

        // Create a new UI
        const ui = new UI();

        // Input User Validation
        if (name === '' || cantidad === '' || color === '') {
            ui.showMessage('Los productos sera eliminados', 'danger');
        }

        // Save Product
        ui.addProduct(product);
        ui.showMessage('Producto agregado correctamente', 'success');
        ui.resetForm();

        e.preventDefault();
    });

document.getElementById('product-list')
    .addEventListener('click', function (e) {
        const ui = new UI();
        ui.deleteProduct(e.target);
        e.preventDefault();
    });