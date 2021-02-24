"use strict"

class Products {
    constructor() {
        this.product;
        this.productDetails = document.getElementById('product-details');
    }

    showProducts() {
        fetch('//localhost:3000/api/cameras')
        .then(response => {
            if (!response.ok) {
                throw Error('Error: ', response.status);
            } return response.json();
        })
        .then(data => {
            this.product = data;
            this.getProducts();
        })
        .catch(error => {
            console.log(error);
        })
    }

    getProducts() {
        for (let i = 0; i < this.product.length; i++) {
            this.productDetails.innerHTML +=
            `
            <figure class="flex flex-col rounded-md bg-white shadow-md m-4 p-4  md:flex-row md:mx-4">
                <img src="${this.product[i].imageUrl}" class="w-80 h-auto object-cover rounded-md" alt="${this.product[i].name} ${this.product[i].description}">
                <figcaption class="flex flex-col md:ml-4">
                    <div class="flex justify-between items-center mt-2">
                        <h2 class="text-2xl pt-2 montserrat">
                            ${this.product[i].name}
                        </h2>
                        <i class="moreDetails${[i]} fas fa-plus fa-2x orange-web-hover cursor-pointer transition" id=""></i>
                    </div>
                    <div id="" class="showDetails${[i]} ">
                        <p class="py-2 montserrat lg:w-80">
                            ${this.product[i].description}
                        </p>
                        <label for="Choisir un objectif" class="py-2">
                            <select name="objectifs" class="objectif${[i]}" id="">
                            </select>
                        </label>
                        <div class="flex flex-row justify-between items-center mt-2">
                            <h3 class="text-xl font-medium merriweather">
                                ${this.product[i].price/100}€
                            </h3>
                            <button id="addToCart" class="ring-2 ring-black bg-platinum rounded-full p-2 text-sm font-semibold uppercase montserrat hover:bg-black hover:text-white focus:outline-none transition">
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </figcaption>
            </figure>
            `
            
            for (let j = 0; j < this.product[i].lenses.length; j++) {
                this.lenses = document.getElementsByClassName('objectif[i]');
                this.lenses.innerHTML +=
                `
                <option value="${this.product[i].lenses[j]}" class="montserrat">
                    ${this.product[i].lenses[j]}
                </option>
                `
            }
        }

        this.moreDetails = document.getElementsByClassName('moreDetails[i]');
        this.showDetails = document.getElementsByClassName('showDetails[i]');
        this.allMoreDetails = this.moreDetails.length;
        this.allShowDetails = this.showDetails.length;
        for (let t = 0; t < this.allMoreDetails; t++) {
            this.moreDetails.addEventListener('click', () => {
                this.showDetails.classList.toggle('active');
            })
        }
    }
}


    

