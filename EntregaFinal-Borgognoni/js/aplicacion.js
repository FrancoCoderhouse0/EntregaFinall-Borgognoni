let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function cargarProductos(productosElegidos) {
productos.forEach((product) =>{
let content = document.createElement("div");
content.className = "card";
content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>`;

shopContent.append(content);


let comprar = document.createElement("button");
comprar.innerText = "comprar";
comprar.className = "comprar";


content.append(comprar);
comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
    
    Toastify({
        text: "Se agrego un producto al carrito",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #000,#4ea93b )",
        borderRadius: "2rem",
        },
        onClick: function(){} 
    }).showToast();
    if (repeat) {
    carrito.map((prod) => {
        if (prod.id === product.id) {
        prod.cantidad++;
        }
    });
    } else {
    carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
    });
    console.log(carrito);
    console.log(carrito.length);
    carritoCounter();
    saveLocal();
    }
});
});

const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito));
};
}
