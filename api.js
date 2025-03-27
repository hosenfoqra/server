const express = require('express');
const { createNewProduct, updateProduct, login, getOneProduct, getAllProducts, deleteProduct, getFilteredProducts, getTotalAmount} = require('./db.js'); ; 

const router = express.Router();

currentToken = null

router.post('/products', (req, res) => {
    const authHeader = req.headers['authorization'];
    if(authHeader == undefined || currentToken == null){
        res.status(401).json({ msg: "Unauthorized"})
    }
    const token = authHeader.split(' ')[1];
    if(currentToken != token){
        res.status(401).json({ msg: "Unauthorized"})
    }
    createNewProduct(req.body["title"], req.body["price"], req.body["type"]);
    res.status(200).json({ message: "Product Added!"})
});

router.post('/login', (req, res) => {
    console.log(req.body)
    const { username, password } = req.body; 
    const result = login(username, password);
    if (result === 'invalid') {
        return res.status(401).json({ message: "Invalid username or password" }); 
    }
    currentToken = result
    res.status(200).json({ message: "Login successful", token: result });
});

router.put('/products/:id', (req, res) => {
    const authHeader = req.headers['authorization'];
    if(authHeader == undefined || currentToken == null){
        res.status(401).json({ msg: "Unauthorized"})
    }
    const token = authHeader.split(' ')[1];
    if(currentToken != token){
        res.status(401).json({ msg: "Unauthorized"})
    }
    id = req.params["id"]
    req.body["price"]
    updateProduct(id, req.body["title"], req.body["price"], req.body["type"], req.body["selected"]);
    res.status(200).json({ message: "Product Updated!"})
});

router.get('/products', (req, res) => {
    const authHeader = req.headers['authorization'];
    console.log("AUTH IS " + authHeader);
    
    // Check if the Authorization header exists
    if (!authHeader || currentToken == null) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    
    // Check the header format ("Bearer <token>")
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    
    const token = parts[1];
    if (currentToken !== token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    
    // Continue processing the request if authorized
    const products = getAllProducts();
    res.status(200).json({ data: products });
  });
  
router.get('/products/:id', (req, res) => {
    const authHeader = req.headers['authorization'];
    if(authHeader == undefined || currentToken == null){
        res.status(401).json({ msg: "Unauthorized"})
    }
    const token = authHeader.split(' ')[1];
    if(currentToken != token){
        res.status(401).json({ msg: "Unauthorized"})
    }
    id = req.params["id"]
    product = getOneProduct(id)
    res.status(200).json({ data: product})
});

router.get('/cart/total', (req, res) => {
    const authHeader = req.headers['authorization'];
    if(authHeader == undefined || currentToken == null){
        res.status(401).json({ msg: "Unauthorized"})
    }
    const token = authHeader.split(' ')[1];
    if(currentToken != token){
        res.status(401).json({ msg: "Unauthorized"})
    }
    total = getTotalAmount()
    res.status(200).json({ total: total})
});

router.delete('/products/:id', (req, res) => {
    const authHeader = req.headers['authorization'];
    if(authHeader == undefined || currentToken == null){
        res.status(401).json({ msg: "Unauthorized"})
    }
    const token = authHeader.split(' ')[1];
    if(currentToken != token){
        res.status(401).json({ msg: "Unauthorized"})
    }
    id = req.params["id"]
    products = deleteProduct(id)
    res.status(200).json({ message: "Product deleted"})
});


module.exports = router; 
