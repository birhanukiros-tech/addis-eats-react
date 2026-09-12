function saveOrders(orders) {
  localStorage.setItem("addis_eats_orders", JSON.stringify(orders));
}

function getOrders() {
  return JSON.parse(localStorage.getItem("addis_eats_orders")) || [];
}

export { saveOrders, getOrders };
