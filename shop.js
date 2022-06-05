const inventario = [
    {
        name: "Sweater Warm",
        ident: 1,
        precio: 12000,
        imagen: "./assets/buzo1.jpeg"
    },
    {
        name: "Sweater Cozy",
        ident: 2,
        precio: 15000,
        imagen: "./assets/buzo2.jpeg"
    },
    {
        name: "Sweater Warm",
        ident: 3,
        precio: 14500,
        imagen: "./assets/buzo3.jpeg"
    },
]

const divProds = document.getElementById("prodsHtml");
const divCart = document.getElementById("cartHtml");

let cart=JSON.parse(localStorage.getItem("carro compras")) || [];

function cardDinamica(){
    inventario.forEach((element)=>{
        divProds.innerHTML += 
        `<div class="cajaDinamica">
            <img src="${element.imagen}" class="rounded img-fluid" width="250"></img>
            <p>${element.name}</p>
            <p>$${element.precio}</p>
            <button id="btn${element.ident}" class="botonCards">Agregar</button>
        </div>`;
    })

    inventario.forEach((producto)=>{
        document.querySelector(`#btn${producto.ident}`).addEventListener("click",()=>{
            sendCart(producto);
        })
    })

}

function sendCart(producto) {
    let existe = cart.some((element)=> element.ident === producto.ident);
    if(!existe){
        producto.cantidad=1;
        cart.push(producto);
    }else{
        let prodFind = cart.find((e) => e.ident === producto.ident);
        prodFind.cantidad++;
    }

    producto.total= producto.cantidad*producto.precio;
    console.log(producto);
    addToCart();
    
    
}

function addToCart() {
    divCart.innerHTML="";
    cart.forEach((element)=>{
        divCart.innerHTML += 
        `<div class="cajaDinamicaCart">
            <img src="${element.imagen}" class="rounded img-fluid" width="100"></img>
            <p>${element.name}</p>
            <p>Total: $ ${element.total}</p>
            <p>Cantidad: ${element.cantidad}</p>
            <button id="borrar${element.ident}" class="botonCart">Borrar</button>
        </div>`;
    });

    localStorage.setItem("carro compras",JSON.stringify(cart));
    borrarProd();
    
}

function borrarProd() {
    cart.forEach((producto)=>{ 
        document.querySelector(`#borrar${producto.ident}`).addEventListener("click",()=>{
            cart=cart.filter(element=>element.ident !== producto.ident);
            addToCart();
        });
    });
    
}



cardDinamica ();
addToCart();
