const productos = [
    { id: 1, nombre: "Cable Unipolar rojo", tamano: "1.5mm", precio: 567, img: "img/cable1.jpg" },
    { id: 2, nombre: "Cable Unipolar verde", tamano: "1.5mm", precio: 567, img: "img/cable2.jpg" },
    { id: 3, nombre: "Cable Unipolar celeste", tamano: "1.5mm", precio: 567, img: "img/cable3.jpg" },
    { id: 16, nombre: "Cable Unipolar marron", tamano: "1.5mm", precio: 567, img: "img/cable4.jpg" },
    { id: 21, nombre: "Cable Unipolar negro", tamano: "1.5mm", precio: 567, img: "img/cable5.jpg" },
    { id: 4, nombre: "Cable Unipolar rojo", tamano: "2.5mm", precio: 905, img: "img/cable1.jpg" },
    { id: 5, nombre: "Cable Unipolar verde", tamano: "2.5mm", precio: 905, img: "img/cable2.jpg" },
    { id: 6, nombre: "Cable Unipolar celeste", tamano: "2.5mm", precio: 905, img: "img/cable3.jpg" },
    { id: 17, nombre: "Cable Unipolar marron", tamano: "2.5mm", precio: 905, img: "img/cable4.jpg" },
    { id: 22, nombre: "Cable Unipolar negro", tamano: "2.5mm", precio: 905, img: "img/cable5.jpg" },
    { id: 7, nombre: "Cable Unipolar rojo", tamano: "4.0mm", precio: 1432, img: "img/cable1.jpg" },
    { id: 8, nombre: "Cable Unipolar verde", tamano: "4.0mm", precio: 1432, img: "img/cable2.jpg" },
    { id: 9, nombre: "Cable Unipolar celeste", tamano: "4.0mm", precio: 1432, img: "img/cable3.jpg" },
     { id: 18, nombre: "Cable Unipolar marron", tamano: "4.0mm", precio: 1432, img: "img/cable4.jpg" },
     { id: 23, nombre: "Cable Unipolar negro", tamano: "4.0mm", precio: 1432, img: "img/cable5.jpg" },
    { id: 10, nombre: "Cable Unipolar rojo", tamano: "6.0mm", precio: 2117, img: "img/cable1.jpg" },
    { id: 11, nombre: "Cable Unipolar verde", tamano: "6.0mm", precio: 2117, img: "img/cable2.jpg" },
    { id: 12, nombre: "Cable Unipolar celeste", tamano: "6.0mm", precio: 2117, img: "img/cable3.jpg" },
     { id: 19, nombre: "Cable Unipolar marron", tamano: "6.0mm", precio: 2117, img: "img/cable4.jpg" },
     { id: 24, nombre: "Cable Unipolar negro", tamano: "6.0mm", precio: 2117, img: "img/cable5.jpg" },
    { id: 13, nombre: "Cable Unipolar rojo", tamano: "1.0mm", precio: 396, img: "img/cable1.jpg" },
    { id: 14, nombre: "Cable Unipolar verde", tamano: "1.0mm", precio: 396, img: "img/cable2.jpg" },
    { id: 15, nombre: "Cable Unipolar celeste", tamano: "1.0mm", precio: 396, img: "img/cable3.jpg" },
    { id: 20, nombre: "Cable Unipolar marron", tamano: "1.0mm", precio: 396, img: "img/cable4.jpg" },
    { id: 26, nombre: "Cable Unipolar negro", tamano: "1.0mm", precio: 396, img: "img/cable5.jpg" },
    // ... agrega tus 15 objetos aquí
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function renderProductos() {
    const cont = document.getElementById('contenedor-productos');
    cont.innerHTML = productos.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre} ${p.tamano}</h3>
            <p>Precio: $${p.precio}</p>
            <input type="number" id="qty-${p.id}" value="1" min="1" class="input-qty">
            <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
        </div>
    `).join('');
}



function agregarAlCarrito(id) {
    const qty = parseInt(document.getElementById(`qty-${id}`).value);
    const prod = productos.find(p => p.id === id);
    const index = carrito.findIndex(item => item.id === id);

    if (index > -1) carrito[index].cantidad += qty;
    else carrito.push({ ...prod, cantidad: qty });
    
    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarritoSidebar();
}

function renderCarritoSidebar() {
    const lista = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    
    let total = 0;
    lista.innerHTML = carrito.map(p => {
        total += p.precio * p.cantidad;
        return `
            <div class="cart-item">
                <span>${p.nombre} ${p.tamano} (x${p.cantidad}) - $${p.precio * p.cantidad}</span>
                <button onclick="eliminarDelCarrito(${p.id})">🗑️</button>
            </div>
        `;
    }).join('');
    
    totalEl.innerText = total;
    countEl.innerText = carrito.reduce((sum, p) => sum + p.cantidad, 0);
}

function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('active'); }

function finalizarCompra() {
    if(carrito.length === 0) return alert("El carrito está vacío");
    
    let total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    let msg = "Hola! Quiero realizar este pedido:%0A";
    carrito.forEach(p => msg += `- ${p.nombre} ${p.tamano}: ${p.cantidad}u ($${p.precio * p.cantidad})%0A`);
    msg += `%0ATOTAL A PAGAR: $${total}`;
    
    window.open(`https://wa.me/5492646619681?text=${msg}`, '_blank');
}

// Iniciar
renderProductos();
renderCarritoSidebar();