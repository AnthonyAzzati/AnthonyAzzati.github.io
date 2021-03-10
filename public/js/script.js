"use strict";

let navbar = new Navbar();
navbar.toggleMenu();

let products = new AllProducts();
products.productsData();

let singleProduct = new SingleProduct();
singleProduct.getProductData();

let cart = new Cart();
cart.getProducts();
cart.showQtyCart();
cart.totalCartPrice();
cart.removeProduct();
cart.clearCart();

let form = new Form();
form.submitForm();
