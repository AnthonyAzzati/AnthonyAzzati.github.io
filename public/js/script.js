"use strict"

let navbar = new Navbar()
navbar.toggleMenu()

let products = new Products()
products.showProducts()

/*

const showLenses = () => {
    for (let i = 0; i < product.lenses.length; i++) {
        document.getElementById('lenses').innerHTML +=
        `
        <select name="objectifs">
            <option value="${product.lenses[i]}" class="montserrat" selected>
                ${product.lenses[i]}
            </option>
        </select>
        `
    }
}

showProducts()
*/