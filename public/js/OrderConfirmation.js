"use strict";

class OrderConfirmation {
  constructor() {
    this.orderNumber = document.getElementById("orderNumber");
  }

  showOrderId() {
    const order = JSON.parse(localStorage.getItem("order"));
    const orderId = order.orderId;
    this.orderNumber.innerHTML = orderId;
  }
}
