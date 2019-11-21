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
        const element = document.createElement('div');/* se va crear un div  con los siguientes parametros*/
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
        productList.appendChild(element);/* mueve de posicion al agregar un nuevo producto */
    }

    resetForm() {
        document.getElementById('product-form').reset();/* resetea la lista */
    }

    deleteProduct(element) {
        if (element.name === 'delete') { /* cuando presiones el elmento delete que es parte del div */
            element.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado correctamente', 'success');
            /* muestra mensaje,tipo de mensaje */
        }
    }
/* metodo para mostrar el mensaje */
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // muestra mensaje en el DOM 
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        // LO INSERTA A LA GUI
        container.insertBefore(div, app);
        // /* SE QUITA A LOS 3 SEGUNDOS */
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM Events
/* AQUI SOLO VAN LAS VALIDACIONES */
document.getElementById('product-form')
    .addEventListener('submit', function (e) {

        const name = document.getElementById('name').value,
            cantidad = document.getElementById('cantidad').value,
            color = document.getElementById('color').value;

        // SE CREA UN OBJETO
        const product = new Product(name, cantidad, color);

        // SE CREA LA UI
        const ui = new UI();

        // VALIDACION
        if (name === '' || cantidad === '' || color === '') {
            ui.showMessage('Los productos sera eliminados', 'danger');
        }

        // SE GUARDA EL OBJETO
        ui.addProduct(product);
        ui.showMessage('Producto agregado correctamente', 'success');
        ui.resetForm();

        e.preventDefault();
    });
/* CUANDO DES CLICK SE EJECUTA LA ACCION BORRADO */
document.getElementById('product-list')
    .addEventListener('click', function (e) {
        const ui = new UI();
        ui.deleteProduct(e.target);
        e.preventDefault();
    });