"use strict";

class Cart {
    constructor() {
        this.cartProducts = document.querySelector("#cart-products");
        this.figureElement = document.getElementById("#figure");
        this.productName = document.querySelector("#product-name");
        this.productLens = document.querySelector("#product-lens");
        this.productPrice = document.querySelector("#product-price");
        this.trashBtn = document.querySelector("#trash-btn");
    }

    getProducts() {
        /** On récupère les données du LocalStorage
         * * et on les transforme en objet afin
         *  de pouvoir les utiliser
         */
        let cart;
        cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);

        const cartProducts = cart.map((camera) => {
            return `
            <hr class="mt-4" />
            <figure
                class="flex flex-col lg:flex-row rounded-md mt-4 p-4 w-1/1 lg:m-4"
                id="#figure"
            >
                <img
                    src="${camera.productImage}"
                    class="w-80 h-auto object-cover rounded-md"
                    alt="${camera.productName}"
                />
                <figcaption class="flex flex-col lg:justify-between lg:pl-4 w-full">
                    <h2 class="text-2xl pt-2 montserrat" id="product-name">
                        ${camera.productName}
                    </h2>
                    <p id="product-lens">28-200mm 2.8/4.5</p>
                    <label>
                        <span class="montserrat">Qté</span>
                        <input
                            class="rounded text-lg merriweather pl-2"
                            type="number"
                            id="quantity"
                            value="1"
                            required
                        />
                    </label>
                    <div class="flex flex-row justify-between items-center mt-2">
                        <h3
                            class="text-xl font-medium merriweather"
                            id="product-price"
                        >
                            ${camera.productPrice / 100} €
                        </h3>
                    </div>
                </figcaption>
            </figure>
            `;
        });
        cartProducts.join("");
        this.cartProducts.insertAdjacentHTML("afterbegin", cartProducts);
    }

    totalCartPrice() {
        let cart;
        let finalTotalPrice;
        cart = JSON.parse(localStorage.getItem("cart"));
        let totalPrice = [];

        cart.forEach((product) => {
            finalTotalPrice = totalPrice.push(product.productPrice);
        });

        const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
        finalTotalPrice = totalPrice.reduce(reducer, 0);

        let cartTotal = document.querySelector("#cart-total");
        cartTotal.innerText = finalTotalPrice / 100 + " €";
    }

    clearCart() {
        this.trashBtn.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.clear();
            location.reload();
        });
    }
}
