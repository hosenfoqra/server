const Product = require('./product-model.js');
const { v4: uuidv4 } = require('uuid');

userName = "hosen"
userPassword = "hosen"

productsDB = [
    {
        id: 0,
        title: "lipstick",
        price: 50,
        selected: false,
        type: "makeup",
        img: "assets/lipstick.jpg"
    },
    {
        id: 1,
        title: "make-up",
        price: 120,
        selected: false,
        type: "makeup",
        img: "assets/makeup.jpg"
    },
    {
        id: 2,
        title: "facial powder",
        price: 70,
        selected: false,
        type: "makeup",
        img: "assets/powder.jpg"
    },
    {
        id: 3,
        title: "kettle",
        price: 220,
        selected: false,
        type: "digital",
        img: "assets/kettle.jpg"
    },
    {
        id: 4,
        title: "laptop",
        price: 2200,
        selected: false,
        type: "digital",
        img: "assets/laptop.jpg"
    },
    {
        id: 5,
        title: "tv",
        price: 3200,
        selected: false,
        type: "digital",
        img: "assets/tv.jpg"
    },
    {
        id: 6,
        title: "pot",
        price: 110,
        selected: false,
        type: "kitchen",
        img: "assets/pot.jpg"
    },
    {
        id: 7,
        title: "mug",
        price: 50,
        selected: false,
        type: "kitchen",
        img: "assets/mug.jpg"
    },
    {
        id: 8,
        title: "spoons set",
        price: 50,
        selected: false,
        type: "kitchen",
        img: "assets/spoons.jpg"
    },
    {
        id: 9,
        title: "knifes set",
        price: 50,
        selected: false,
        type: "kitchen",
        img: "assets/knifes.jpg"
    },
]
lastId = 10

function login(username, password){
    if(username === userName && password === userPassword){
        token = uuidv4()
        return token
    }
    return "invalid"
}

function createNewProduct(title, price, type){
    let product = new Product(lastId, title, price, type)
    lastId++
    productsDB.push(product)
}

function getAllProducts(){
    return productsDB.sort((a, b) => a.id - b.id)
}

function sortProductsByPrice(products, sort){
    if(sort=="asc"){
        return products.sort((a, b) => a.price - b.price)
    }else{
        return products.sort((a, b) => b.price - a.price)
    }
    
}

function deleteProduct(id){
    product = productsDB.filter((product) => product.id == id)
    const index = productsDB.findIndex((product) => product.id == id);
    if (index !== -1) {
        productsDB.splice(index, 1);
    }
}

function getFilteredProducts(filter, sort){
    if(filter != undefined){
        products = productsDB.filter((product) => product.type==filter).sort((a, b) => a.id - b.id)
    }
    if(sort != undefined){
        product = sortProductsByPrice(products, sort)
    }
    
    return products
}


function getTotalAmount(){
    let counter = 0
    let selected = productsDB.filter((product) => product.selected==true)
    selected.forEach((item) => counter += item.price)
    return counter
}
function updateProduct(id, title, price, type, selected){
    product = productsDB.filter((product) => product.id==id)[0]
    const index = productsDB.findIndex((product) => product.id == id);
    if (index !== -1) {
        productsDB.splice(index, 1);
    }
    product.title = title
    product.price = price
    product.type = type
    product.selected = selected
    productsDB.push(product)
}

function getOneProduct(id){
    product = productsDB.filter((product) => product.id==id)[0]
    return product
}

module.exports = {login, getOneProduct, createNewProduct, updateProduct, getAllProducts, deleteProduct ,getFilteredProducts, getTotalAmount};