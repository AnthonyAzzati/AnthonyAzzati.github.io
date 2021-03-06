"use strict";

class AllProducts {
    constructor() {}

    productsData() {
        fetch("http://localhost:3000/api/cameras")
            .then((response) => {
                if (!response.ok) {
                    throw Error("ERROR");
                }
                return response.json();
            })
            .then((data) => {
                const productHtml = data
                    .map((camera) => {
                        return `
                    <figure id="figure" class="flex flex-col rounded-md bg-white shadow-md m-4 p-4  md:flex-row md:mx-4">
                        <img src="${
                            camera.imageUrl
                        }" class="w-80 h-auto object-cover rounded-md" alt="${
                            camera.name
                        }" id="product-image">
                        <figcaption class="flex flex-col md:ml-4">
                            <div class="flex justify-between items-center mt-2">
                                <h2 class="text-2xl pt-2 montserrat">
                                    ${camera.name}
                                </h2>
                            </div>
                            <div id="" class="">
                                <p class="py-2 montserrat lg:w-80" id="product-description">
                                    ${camera.description}
                                </p>
                                <div class="flex flex-row justify-between items-center mt-2">
                                    <h3 class="text-xl font-medium merriweather">
                                        ${camera.price / 100} €
                                    </h3>
                                    <div class="flex self-center text-center align-middle rounded-full ring-2 ring-black text-black hover:bg-white hover:text-black animate-pulse transition w-auto my-4 p-2">
                                        <a href="../views/nos-produits.html?id${
                                            camera._id
                                        }"> 
                                            <span class="uppercase montserrat font-bold">Voir le produit</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                        </figcaption>
                    </figure>
                    `;
                    })
                    .join("");
                document
                    .querySelector("#products")
                    .insertAdjacentHTML("afterbegin", productHtml);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
