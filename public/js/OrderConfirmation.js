"use strict";

class OrderConfirmation {
  constructor() {
    this.orderNumber = document.getElementById("orderNumber");
  }

  /**
   * Récupère l'orderId stocké dans le localStorage et l'affiche
   * dans le navigateur de l'ulisateur
   */
  showOrderId() {
    const order = JSON.parse(localStorage.getItem("order"));
    const orderId = order.orderId;

    this.orderNumber.innerHTML = orderId;

    localStorage.clear();
  }
}
