const stockProductos = [
    {
      id: 1,
      nombre: "bermuda 1",
      cantidad: 1,
      desc: "bermuda muy comoda",
      precio: 1200,
      img: "img/bermuda1.jpg",
    },
    {
      id: 2,
      nombre: "bermuda 2",
      cantidad: 1,
      desc: "bermuda muy comoda",
      precio: 1500,
      img: "img/bermuda2.jpeg",
    },
    {
      id: 3,
      nombre: "bermuda 3",
      cantidad: 1,
      desc: "bermuda muy comoda",
      precio: 1570,
      img: "img/bermuda3.jpeg",
    },
    {
      id: 4,
      nombre: "bermuda 4",
      cantidad: 1,
      desc: "bermuda muy comoda",
      precio: 1000,
      img: "img/bermuda4.jpg",
    },
    {
      id: 5,
      nombre: "bermuda 5",
      cantidad: 1,
      desc: "bermuda muy comoda",
      precio: 1200,
      img: "img/bermuda5.jpg",
    },
    {
      id: 6,
      nombre: "campera 1",
      cantidad: 1,
      desc: "campera muy comoda",
      precio: 1200,
      img: "img/campera1.jpg",
    },
    {
      id: 7,
      nombre: "campera 2",
      cantidad: 1,
      desc: "campera muy comoda",
      precio: 1400,
      img: "img/campera2.jpg",
    },
    {
      id: 8,
      nombre: "campera 3",
      cantidad: 1,
      desc: "campera muy comoda",
      precio: 1200,
      img: "img/campera3.jpg",
    },
    {
      id: 9,
      nombre: "campera 4",
      cantidad: 1,
      desc: "campera muy comoda",
      precio: 1400,
      img: "img/campera4.jpg",
    },
    {
      id: 10,
      nombre: "campera 5",
      cantidad: 1,
      desc: "campera muy comoda",
      precio: 1200,
      img: "img/campera5.jpg",
    },
  ];

let carrito = []

const contenedor = document.querySelector(`#contenedor`)
const carritoContenedor = document.querySelector('#carritoContenedor')
const vaciarCarrito = document.querySelector('#vaciarCarrito')
const precioTotal = document.querySelector('#precioTotal')



document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()
})

stockProductos.forEach((prod) => {
    const {id, nombre, precio, desc, img, cantidad} = prod
    contenedor.innerHTML += `
    <div class="card" style="width: 18rem;">
  <img src="${img}" class="card-img-top mt-2" alt="...">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">Precio: ${precio}</p>
    <p class="card-text">Descripcion: ${desc}</p>
    <p class="card-text">Cantidad: ${cantidad}</p>
    <button onclick="agregarProducto(${id})" class="btn btn-primary">agregar al carrito</button>
  </div>
</div>
    `
})

vaciarCarrito.addEventListener('click', () =>  {
    carrito.length = []
    mostrarCarrito()
})

function agregarProducto(id){
    const existe = carrito.some(prod => prod.id === id)

    if(existe){
        const prod = carrito.map(prod => {
            if(prod.id === id){
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === id)
        carrito.push(item)
    }

    mostrarCarrito()
}

const mostrarCarrito = () => {
    const modalBody = document.querySelector(`.modal .modal-body`)

     modalBody.innerHTML = ''
     carrito.forEach((prod) => {
        const {id, nombre, img, desc, cantidad, precio} = prod
        modalBody.innerHTML += `
        <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>

        <div>
        <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad: ${cantidad}</p>

        <button onclick="eliminarProducto(${id})" class="btn btn-danger">eliminar producto</button>
        </div>
        </div>
        `
    })

    if(carrito.length === 0){
        modalBody.innerHTML = `
        <p class="text-center text-primary parrafo">Aun no agregaste nada!</p>
        `
    } else {
    console.log('hay algo')
    }


    
    carritoContenedor.textContent = carrito.length

    precioTotal.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
    guardarStorage()
}

function eliminarProducto(id){
    const ropaId = id
    carrito = carrito.filter((ropa) => ropa.id !== ropaId)
    mostrarCarrito()
}



function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


















