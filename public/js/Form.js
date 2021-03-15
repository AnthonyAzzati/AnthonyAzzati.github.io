"use strict";

class Form {
  constructor() {
    this.formSubmitBtn = document.getElementById("order-btn");
  }

  submitForm() {
    /**
     ** Création de la requête 'POST' lors
     ** du submit avec stockage de la data dans
     ** le localStorage puis redirection vers la
     ** page de confirmation de commande
     */

    this.formSubmitBtn.addEventListener("click", function (event) {
      /**
       ** Déclaration des constantes
       */
      const firstName = document.getElementById("firstname");
      const lastName = document.getElementById("lastname");
      const address = document.getElementById("address");
      const city = document.getElementById("city");
      const email = document.getElementById("email");

      /**
       ** Permet de vérifier que tout les champs sont remplis et conformes
       */
      if (
        !firstName.value.match(/^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/) ||
        !lastName.value.match(/^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/) ||
        !address.value.match(
          /^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/
        ) ||
        !city.value.match(/^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/) ||
        !email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        alert(
          "Tous les champs doivent être remplis avec des informations conformes et valides afin de confirmer votre commande."
        );
      } else {
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

        /**
         ** Permet de vider les produits stockés dans le localStorage
         */
        localStorage.clear();
      }

      event.preventDefault();
      event.stopPropagation();
    });
  }
}
