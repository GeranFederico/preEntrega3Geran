class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const libroUno = new Producto(1, "Los Compas y el diamantito legendario", 45, "img/diamantitolegendario.jpg");
const libroDos = new Producto(2, "Los Compas escapan de la prisión", 47, "img/escapandeprision.jpg");
const libroTres = new Producto(3, "Los Compas y la cámara del tiempo", 50, "img/camaradeltiempo.jpg");
const libroCuatro = new Producto(4, "Los Compas y la Maldición de Mikecrack", 70, "img/maldicionmikecrack.jpg");
const libroCinco = new Producto(5, "Los Compas y la Entidad.Exe", 55, "img/entidadexe.webp");
const libroSeis = new Producto(6, "Los Compas perdidos en el espacio", 65, "img/perdidoespacio.jpg");

/*Array de productos*/
const productos = [libroUno, libroDos, libroTres, libroCuatro, libroCinco, libroSeis];

let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class= "card-body">
                        <h5>${producto.nombre}</h5>
                        <p>USD ${producto.precio} </p>
                        <button class="btn colorBoton" id="boton${producto.id}" > Añadir </button>
                    </div>
                </div>
                        `
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            Toastify({
                text: "Producto Agregado al Carrito",
                duration: 2000,
                position: "right",
                gravity: "bottom"
            }).showToast();
        })
    })
}

mostrarProductos();


const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}


const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class= "card-body">
                        <h5>${producto.nombre}</h5>
                        <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                        <button class="btn colorBoton" id="eliminar${producto.id}" > Eliminar Producto </button>
                    </div>
                </div>
                        `
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })

    })
    calcularTotal();
}


const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}



const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})


const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}


const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra = totalCompra + producto.precio * producto.cantidad;
    })
    total.innerHTML = ` USD ${totalCompra}`;
}


// Uso de Fetch

const valorDolar = "https://criptoya.com/api/dolar";

const dolar = document.getElementById("cotizacionDolar");

setInterval(() => {
    fetch(valorDolar)
        .then(response => response.json())
        .then(({ blue }) => {
            cotizacionDolar.innerHTML = ` 
            <h3> $ ${blue} </h3>
            `
        })
        .catch(error => console.log(error))
}, 5000)

setTimeout(() => {
    document.body.style.backgroundColor = "red";
}, 3000)