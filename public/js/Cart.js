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

        if (cart === null) {
            this.cartProducts.innerHTML = `
                <h2 class="my-8 montserrat text-2xl">Aucun produit dans votre panier</h2>
            `;
            this.trashBtn.remove();
        } else {
            const cartAllProducts = cart.map((camera) => {
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
                            min="1"
                            max="1"
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
                        <div class="self-end">
                        <button id="clear-btn">
                            <i
                                class="far fa-trash-alt fa-2x text-gray-600 hover:text-yellow-500 transition focus:border-none"
                            ></i>
                        </button>
                    </div>
                    </div>
                </figcaption>
            </figure>
            `;
            });
            this.cartProducts.insertAdjacentHTML("afterbegin", cartAllProducts);
        }
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

    removeProduct() {
        let clearBtn = document.querySelectorAll("#clear-btn");
        let cart;

        for (let i = 0; i < clearBtn.length; i++) {
            if (localStorage.getItem("cart") === null) {
                cart = [];
            } else {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            clearBtn[i].addEventListener("click", function () {
                cart.splice([i], 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                window.location.reload();
            });
        }
    }

    clearCart() {
        this.trashBtn.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.clear();
            location.reload();
        });
    }

    showQtyCart() {
        let cartQty = document.getElementById("cart-qty");
        let cart;
        cart = JSON.parse(localStorage.getItem("cart"));
        if (cart.length > 0) {
            cartQty.innerHTML = `
            ${cart.length}  
            `;
            cartQty.classList.add(
                "absolute",
                "flex",
                "items-center",
                "justify-center",
                "-top-3",
                "-right-3",
                "rounded-full",
                "w-5",
                "h-5",
                "bg-orange-web",
                "montserrat",
                "text-sm",
                "font-medium"
            );
        } else {
            cartQty.remove();
        }
    }
}
