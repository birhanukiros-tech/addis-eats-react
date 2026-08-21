// =====================================================
// ADMIN DASHBOARD
// =====================================================


// =====================================================
// 1. CHECK ADMIN LOGIN
// =====================================================

if (sessionStorage.getItem("adminLoggedIn") !== "true") {

    window.location.href = "admin-login.html";

}


// =====================================================
// 2. GET ELEMENTS
// =====================================================

const logoutButton = document.querySelector("#logout-button");

const totalRevenue = document.querySelector("#total-revenue");

const totalOrders = document.querySelector("#total-orders");

const averageOrder = document.querySelector("#average-order");

const pendingOrders = document.querySelector("#pending-orders");

const statusDistribution =
    document.querySelector("#status-distribution");

const topSellingDishes =
    document.querySelector("#top-selling-dishes");

const menuSearch =
    document.querySelector("#menu-search");

const menuList =
    document.querySelector("#menu-list");

const addDishButton =
    document.querySelector("#add-dish-button");

const dishFormSection =
    document.querySelector("#dish-form-section");

const dishForm =
    document.querySelector("#dish-form");

const dishFormTitle =
    document.querySelector("#dish-form-title");

const cancelDishButton =
    document.querySelector("#cancel-dish-button");

const ordersList =
    document.querySelector("#orders-list");


// Form fields

const dishId =
    document.querySelector("#dish-id");

const dishName =
    document.querySelector("#dish-name");

const dishDescription =
    document.querySelector("#dish-description");

const dishPrice =
    document.querySelector("#dish-price");

const dishCategory =
    document.querySelector("#dish-category");

const dishImage =
    document.querySelector("#dish-image");

const dishIngredients =
    document.querySelector("#dish-ingredients");


// =====================================================
// 3. LOAD DATA
// =====================================================

let menu = JSON.parse(
    localStorage.getItem("addiseats_menu")
) || [];

let orders = JSON.parse(
    localStorage.getItem("addiseats_orders")
) || [];


// =====================================================
// 4. SAVE DATA
// =====================================================

function saveMenu() {

    localStorage.setItem(
        "addiseats_menu",
        JSON.stringify(menu)
    );

}


function saveOrders() {

    localStorage.setItem(
        "addiseats_orders",
        JSON.stringify(orders)
    );

}


// =====================================================
// 5. DASHBOARD ANALYTICS
// =====================================================

function renderAnalytics() {

    const revenue = orders.reduce(function (total, order) {

        return total + Number(order.total || 0);

    }, 0);


    const orderCount = orders.length;


    const average =
        orderCount > 0
            ? revenue / orderCount
            : 0;


    const pending = orders.filter(function (order) {

        return order.status === "pending";

    }).length;


    totalRevenue.textContent =
        `${revenue.toLocaleString()} ETB`;

    totalOrders.textContent =
        orderCount;

    averageOrder.textContent =
        `${average.toFixed(2)} ETB`;

    pendingOrders.textContent =
        pending;


    renderStatusDistribution();

    renderTopSellingDishes();

}


// =====================================================
// 6. ORDER STATUS DISTRIBUTION
// =====================================================

function renderStatusDistribution() {

    const statuses = [
        "pending",
        "preparing",
        "delivering",
        "delivered"
    ];


    statusDistribution.innerHTML = "";


    statuses.forEach(function (status) {

        const count = orders.filter(function (order) {

            return order.status === status;

        }).length;


        const card =
            document.createElement("div");

        card.className = "status-card";


        card.innerHTML = `

            <h3>
                ${status}
            </h3>

            <strong>
                ${count}
            </strong>

        `;


        statusDistribution.append(card);

    });

}


// =====================================================
// 7. TOP SELLING DISHES
// =====================================================

function renderTopSellingDishes() {

    topSellingDishes.innerHTML = "";


    const sales = {};


    orders.forEach(function (order) {

        if (!order.items) return;


        order.items.forEach(function (item) {

            if (!sales[item.name]) {

                sales[item.name] = 0;

            }


            sales[item.name] +=
                Number(item.quantity || 1);

        });

    });


    const sortedSales =
        Object.entries(sales)
        .sort(function (a, b) {

            return b[1] - a[1];

        })
        .slice(0, 5);


    if (sortedSales.length === 0) {

        topSellingDishes.innerHTML =
            `<p class="admin-empty">
                No sales yet.
            </p>`;

        return;

    }


    sortedSales.forEach(function ([name, quantity]) {

        const dish =
            document.createElement("div");

        dish.className = "top-dish";


        dish.innerHTML = `

            <span>
                ${name}
            </span>

            <strong>
                ${quantity} sold
            </strong>

        `;


        topSellingDishes.append(dish);

    });

}


// =====================================================
// 8. DISPLAY MENU
// =====================================================

function renderMenu(list = menu) {

    menuList.innerHTML = "";


    if (list.length === 0) {

        menuList.innerHTML =
            `<p class="admin-empty">
                No dishes found.
            </p>`;

        return;

    }


    list.forEach(function (dish) {

        const card =
            document.createElement("article");

        card.className =
            "admin-dish-card";


        card.innerHTML = `

            <img
                src="${dish.image}"
                alt="${dish.name}"
            >

            <h3>
                ${dish.name}
            </h3>

            <p>
                ${dish.description}
            </p>

            <strong>
                ${Number(dish.price).toLocaleString()} ETB
            </strong>

            <p>
                Category: ${dish.category}
            </p>

            <div class="dish-actions">

                <button
                    class="edit-button"
                    data-id="${dish.id}"
                >
                    Edit
                </button>

                <button
                    class="delete-button"
                    data-id="${dish.id}"
                >
                    Delete
                </button>

            </div>

        `;


        menuList.append(card);

    });

}


// =====================================================
// 9. SEARCH DISHES
// =====================================================

menuSearch.addEventListener(
    "input",
    function () {

        const searchTerm =
            menuSearch.value
            .trim()
            .toLowerCase();


        const filteredMenu =
            menu.filter(function (dish) {

                return dish.name
                    .toLowerCase()
                    .includes(searchTerm);

            });


        renderMenu(filteredMenu);

    }
);


// =====================================================
// 10. ADD DISH BUTTON
// =====================================================

addDishButton.addEventListener(
    "click",
    function () {

        dishForm.reset();

        dishId.value = "";

        dishFormTitle.textContent =
            "Add New Dish";

        dishFormSection.hidden = false;

        dishFormSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


// =====================================================
// 11. CANCEL FORM
// =====================================================

cancelDishButton.addEventListener(
    "click",
    function () {

        dishForm.reset();

        dishId.value = "";

        dishFormSection.hidden = true;

    }
);


// =====================================================
// 12. ADD / EDIT DISH
// =====================================================

dishForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            dishName.value.trim();

        const description =
            dishDescription.value.trim();

        const price =
            Number(dishPrice.value);

        const category =
            dishCategory.value;

        const image =
            dishImage.value.trim();

        const ingredients =
            dishIngredients.value
            .split(",")
            .map(function (ingredient) {

                return ingredient.trim();

            })
            .filter(Boolean);


        // EDIT

        if (dishId.value) {

            const id =
                Number(dishId.value);


            const dish =
                menu.find(function (item) {

                    return item.id === id;

                });


            if (dish) {

                dish.name = name;

                dish.description = description;

                dish.price = price;

                dish.category = category;

                dish.image = image;

                dish.ingredients = ingredients;

            }

        }

        // ADD

        else {

            const newDish = {

                id: Date.now(),

                name: name,

                description: description,

                price: price,

                category: category,

                image: image,

                ingredients: ingredients

            };


            menu.push(newDish);

        }


        saveMenu();

        renderMenu();

        dishForm.reset();

        dishId.value = "";

        dishFormTitle.textContent =
            "Add New Dish";

        dishFormSection.hidden = true;

    }
);


// =====================================================
// 13. EDIT / DELETE MENU
// =====================================================

menuList.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest("button");


        if (!button) return;


        const id =
            Number(button.dataset.id);


        // EDIT

        if (
            button.classList.contains(
                "edit-button"
            )
        ) {

            const dish =
                menu.find(function (item) {

                    return item.id === id;

                });


            if (!dish) return;


            dishId.value = dish.id;

            dishName.value = dish.name;

            dishDescription.value =
                dish.description;

            dishPrice.value = dish.price;

            dishCategory.value =
                dish.category;

            dishImage.value =
                dish.image;

            dishIngredients.value =
                dish.ingredients.join(", ");


            dishFormTitle.textContent =
                "Edit Dish";

            dishFormSection.hidden = false;


            dishFormSection.scrollIntoView({
                behavior: "smooth"
            });

        }


        // DELETE

        if (
            button.classList.contains(
                "delete-button"
            )
        ) {

            const confirmed =
                confirm(
                    "Are you sure you want to delete this dish?"
                );


            if (!confirmed) return;


            menu =
                menu.filter(function (dish) {

                    return dish.id !== id;

                });


            saveMenu();

            renderMenu();

        }

    }
);


// =====================================================
// 14. DISPLAY ORDERS
// =====================================================

function renderOrders() {

    ordersList.innerHTML = "";


    if (orders.length === 0) {

        ordersList.innerHTML =
            `<p class="admin-empty">
                No orders yet.
            </p>`;

        return;

    }


    orders.forEach(function (order) {

        const card =
            document.createElement("article");

        card.className =
            "order-admin-card";


        const itemsHTML =
            (order.items || [])
            .map(function (item) {

                return `
                    <li>
                        ${item.name}
                        × ${item.quantity || 1}
                    </li>
                `;

            })
            .join("");


        card.innerHTML = `

            <h3>
                Order #${order.id}
            </h3>

            <p>
                <strong>Customer:</strong>
                ${order.name || "Unknown"}
            </p>

            <p>
                <strong>Phone:</strong>
                ${order.phone || "N/A"}
            </p>

            <p>
                <strong>Area:</strong>
                ${order.area || "N/A"}
            </p>

            <p>
                <strong>Total:</strong>
                ${Number(order.total || 0).toLocaleString()} ETB
            </p>

            <p>
                <strong>Items:</strong>
            </p>

            <ul>
                ${itemsHTML}
            </ul>

            <div class="order-controls">

                <select
                    class="status-select"
                    data-id="${order.id}"
                >

                    <option value="pending"
                        ${order.status === "pending" ? "selected" : ""}>
                        Pending
                    </option>

                    <option value="preparing"
                        ${order.status === "preparing" ? "selected" : ""}>
                        Preparing
                    </option>

                    <option value="delivering"
                        ${order.status === "delivering" ? "selected" : ""}>
                        Delivering
                    </option>

                    <option value="delivered"
                        ${order.status === "delivered" ? "selected" : ""}>
                        Delivered
                    </option>

                </select>


                <button
                    class="delete-order-button"
                    data-id="${order.id}"
                >
                    Delete Order
                </button>

            </div>

        `;


        ordersList.append(card);

    });

}


// =====================================================
// 15. ORDER CONTROLS
// =====================================================

ordersList.addEventListener(
    "change",
    function (event) {

        if (
            !event.target.classList.contains(
                "status-select"
            )
        ) return;


        const id =
            Number(event.target.dataset.id);


        const order =
            orders.find(function (item) {

                return item.id === id;

            });


        if (!order) return;


        order.status =
            event.target.value;


        saveOrders();

        renderAnalytics();

    }
);


ordersList.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.classList.contains(
                "delete-order-button"
            )
        ) return;


        const id =
            Number(event.target.dataset.id);


        const confirmed =
            confirm(
                "Delete this order?"
            );


        if (!confirmed) return;


        orders =
            orders.filter(function (order) {

                return order.id !== id;

            });


        saveOrders();

        renderOrders();

        renderAnalytics();

    }
);


// =====================================================
// 16. LOGOUT
// =====================================================

logoutButton.addEventListener(
    "click",
    function () {

        sessionStorage.removeItem(
            "adminLoggedIn"
        );

        window.location.href =
            "admin-login.html";

    }
);


// =====================================================
// 17. START DASHBOARD
// =====================================================

renderAnalytics();

renderMenu();

renderOrders();