"use strict";

class Form {
  constructor() {
    this.formSubmitBtn = document.getElementById("order-btn");
    this.firstName = document.getElementById("firstname");
    this.lastName = document.getElementById("lastname");
    this.address = document.getElementById("address");
    this.city = document.getElementById("city");
    this.email = document.getElementById("email");
  }

  submitForm() {
    /**
     ** Création de la requête 'POST' lors
     ** du submit avec stockage de la data dans
     ** le localStorage puis redirection vers la
     ** page de confirmation de commande
     */

    this.formSubmitBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      /**
       ** Déclaration des constantes
       */
      const firstName = document.getElementById("firstname");
      const lastName = document.getElementById("lastname");
      const address = document.getElementById("address");
      const city = document.getElementById("city");
      const email = document.getElementById("email");

      /**
       ** Création de l'objet 'contact'
       */
      let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      };

      /**
       ** Création de l'array 'products' permettant de
       ** récupérer l'ID des produits
       ** présents dans le panier
       */
      let products = [];

      let cart;
      cart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < cart.length; i++) {
        products.push(cart[i].productId);
      }

      /**
       ** Création d'un objet 'order' contenant
       ** l'objet 'contact' et l'array 'products
       */
      let order = {
        contact,
        products,
      };

      console.log(order);

      if (
        contact.firstName != null ||
        contact.lastName != null ||
        contact.address != null ||
        contact.city != null ||
        contact.email != null ||
        products != null
      ) {
        fetch("http://localhost:3000/api/cameras/order", {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "Application/Json; charset=UTF-8",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then(function (data) {
            localStorage.setItem("order", JSON.stringify(data));
            document.location = "../views/ma-commande.html";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }
}
