

let shoppingCartArray = [];
let productContainer = document.querySelector(".shop-items");

let res = await fetch("https://api.escuelajs.co/api/v1/products");
let data = await res.json();

let productsArray = [
    {
        "id": 1,
        "title": "coffe",
        "price": "8",
        "images":  "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
    },
    {
        "id": 2,
        "title": "hamburguer",
        "price": "15",
        "images":  "https://resizer.glanacion.com/resizer/aDuSrK-kFy1v27LtOHPRYl4QlRs=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/RHVGX3MHVRB7VGEXBEVCCZHW5I.jpg",
    },
    {
        "id": 3,
        "title": "hot-dog",
        "price": "10",
        "images":  "https://elcordillerano1.cdn.net.ar/252/elcordillerano/images/01/17/05/1170526_02c464a5989c3eac47872e16fa47396551c7f8da872acc240369448db3c13dee/lg.webp",
    },
    {
        "id": 4,
        "title": "watch",
        "price": "40",
        "images":  "https://http2.mlstatic.com/D_NQ_NP_739213-MLA46332952432_062021-V.jpg",
    }
]




productsArray.forEach(product => {
    productContainer.innerHTML += `
    <div class="shop-item" id="${product.id}">
    <span class="shop-item-title">${product.title}</span>
    <img class="shop-item-image" src="${product.images}">
    <div class="shop-item-details">
        <span class="shop-item-price">$${product.price}</span>
        <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
    </div>
</div>`
});

let totality = document.getElementById("price")
let cartItems = document.querySelector(".cart-items")

let boton = document.querySelectorAll(".shop-item-button")
boton = [...boton]



boton.forEach(btn => {
btn.addEventListener("click", e => {
        console.log("click");
        let idActual = parseInt(e.target.parentNode.parentNode.id)
        let actualProduct = productsArray.find(index => index.id == idActual)

        if(actualProduct.quantity === undefined || actualProduct.quantity === 0) {
            actualProduct.quantity = 1;
        }

        let existe = false;
        shoppingCartArray.forEach(libro => {
            if(idActual == libro.id){
                existe = true
            }
        })

        if(existe){
            actualProduct.quantity++
        }else{
            shoppingCartArray.push(actualProduct)
        }

console.log(shoppingCartArray)

        drawItems()

getTotal()

updateNumberOfItems()

removeItems(idActual)
})
});

function drawItems(){
    cartItems.innerHTML = "";
        shoppingCartArray.forEach(carta => {

            cartItems.innerHTML += `
            <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${carta.images}" width="100" height="100">
                <span class="cart-item-title">${carta.title}</span>
            </div>
            <span class="cart-price cart-column">$${carta.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" min="1" type="number" value="${carta.quantity}">
                <button class="btn btn-danger"  type="button">REMOVE</button>
            </div>
        </div>`
        })
}



function getTotal(){
    let sumTotal
    let total = shoppingCartArray.reduce( (sum, item) => {
        sumTotal = sum + item.quantity*item.price
        return sumTotal
    } , 0 );
    totality.innerHTML = `${total}`
}



function updateNumberOfItems (){

let inputNumber = document.querySelectorAll(".cart-quantity-input")
inputNumber = [...inputNumber]

inputNumber.forEach(item => {
    item.addEventListener("click", event =>  {
    let actualTitle = event.target.parentElement.parentElement.childNodes[1].innerText
    let actualBookQuantity = parseInt(event.target.value);

    let actualBookObject = shoppingCartArray.find(titulo => titulo.title == actualTitle)
    console.log(actualBookObject)

    actualBookObject.quantity = actualBookQuantity
    getTotal()

})
})
 }


function removeItems(idActual){
    let boton = document.querySelectorAll(".btn-danger")
    boton = [...boton]
    boton.forEach(botones => {
    botones.addEventListener("click", e => {
    let actualTitulo = e.target.parentElement.parentElement.childNodes[1].innerText
    let actualId = shoppingCartArray.find(titulo => titulo.title == actualTitulo)
    let actualHtml= e.target.parentElement.parentElement.innerHTML = ""

    shoppingCartArray = shoppingCartArray.filter(item => item != actualId)
    console.log(shoppingCartArray)

    actualId.quantity = 0;

    getTotal()
 })
})
}



