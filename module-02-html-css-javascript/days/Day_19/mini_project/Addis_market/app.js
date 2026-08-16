const form = document.querySelector("#item-form");
const nameInput = document.querySelector("#item-name");
const priceInput = document.querySelector("#item-price");
const itemList = document.querySelector("#item-list");
const total = document.querySelector("#total");

let items = [];
let nextId = 1;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    if (!name || price <= 0) {
        alert("Please enter a valid grocery name and price.");
        return;
    }

    const item = {
        id: nextId,
        name: name,
        price: price,
        bought: false
    };

    nextId++;

    items.push(item);

    render();

    nameInput.value = "";
    priceInput.value = "";
});

function render() {
    itemList.innerHTML = "";

    let totalPrice = 0;

    items.forEach((item) => {
        const li = document.createElement("li");

        li.dataset.id = item.id;

        li.textContent = `${item.name} - ETB ${item.price}`;

        if (item.bought) {
            li.classList.add("bought");
        }

        const boughtButton = document.createElement("button");
        boughtButton.textContent = "Bought";
        boughtButton.dataset.action = "bought";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.dataset.action = "delete";

        li.append(boughtButton, deleteButton);

        itemList.append(li);

        if (!item.bought) {
            totalPrice += item.price;
        }
    });

    total.textContent = `Total: ETB ${totalPrice}`;
}

itemList.addEventListener("click", (event) => {
    const button = event.target;

    if (!button.matches("button")) {
        return;
    }

    const li = button.closest("li");
    const id = Number(li.dataset.id);

    const item = items.find((item) => item.id === id);

    if (button.dataset.action === "delete") {
        items = items.filter((item) => item.id !== id);
    }

    if (button.dataset.action === "bought") {
        item.bought = !item.bought;
    }

    render();
});