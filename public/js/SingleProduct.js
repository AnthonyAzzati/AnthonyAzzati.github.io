"use strict";

class SingleProduct {
    constructor() {}

    getProductData() {
        // URL de l'API
        const url = "http://localhost:3000/api/cameras";

        // ID du produit
        let research = window.location.search;
        research = research.replace("?id", "/");

        const singleUrl = url + research;
        fetch(singleUrl)
            .then((response) => {
                if (!response.ok) {
                    throw Error("Error");
                }
                return response.json();
            })
            .then((data) => {
                // Ajout de la photo du produit
                let imageElement = document.querySelector("#figure");
                imageElement.insertAdjacentHTML(
                    "afterbegin",
                    `
                        <img src="${data.imageUrl}" class="w-80 h-auto object-cover rounded-md" alt="" id="product-image">
                    `
                );

                // Ajout du nom du produit
                let productName = document.querySelector("h2");
                productName.innerHTML = data.name;

                // Ajout de la description du produit
                let productDescription = document.querySelector(
                    "#product-description"
                );
                productDescription.innerHTML = data.description;

                // Ajout de la personnalisation du produit
                let productLens = document.querySelector("#objectifs");
                for (let i = 0; i < data.lenses.length; i++) {
                    productLens.insertAdjacentHTML(
                        "afterbegin",
                        `
                        <option class="montserrat">
                            ${data.lenses[i]}
                        </option>
                    `
                    );
                }

                // Ajout du prix du produit
                let productPrice = document.querySelector("#product-price");
                productPrice.innerHTML = data.price / 100 + " €";

                function addToLocalStorage() {
                    let cart;
                    let chosenLens = productLens.value;
                    let productMap = {
                        productName: data.name,
                        productPrice: data.price,
                        productId: data._id,
                        productLens: chosenLens,
                        productImage: data.imageUrl,
                    };

                    if (localStorage.getItem("cart") === null) {
                        cart = [];
                    } else {
                        cart = JSON.parse(localStorage.getItem("cart"));
                    }
                    cart.push(productMap);
                    localStorage.setItem("cart", JSON.stringify(cart));
                }

                let addToCartBtn = document.getElementById("addToCart-btn");
                addToCartBtn.addEventListener("click", function (event) {
                    event.preventDefault();
                    addToLocalStorage();
                    alert("Votre produit a été ajouté au panier");
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
