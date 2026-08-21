// =====================================================
// DOM REFERENCES
// =====================================================

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

const specialInstructions =
    document.querySelector("#special-instructions");

const categoryButtons =
    document.querySelector("#category-buttons");

const cartList =
    document.querySelector("#cart-list");

const cartTotal =
    document.querySelector("#cart-total");

const checkout =
    document.querySelector("#checkout");

const checkoutForm =
    document.querySelector("#checkout-form");

const customerName =
    document.querySelector("#customer-name");

const customerPhone =
    document.querySelector("#customer-phone");

const deliveryArea =
    document.querySelector("#delivery-area");

const checkoutMessage =
    document.querySelector("#checkout-message");

const loadingMessage =
    document.querySelector("#loading-message");

const menuEmpty =
    document.querySelector("#menu-empty");

const menuError =
    document.querySelector("#menu-error");

const menuList =
    document.querySelector("#menu-list");

const orderConfirmation =
    document.querySelector("#order-confirmation");

const confirmationMessage =
    document.querySelector("#confirmation-message");

const orderHistoryList =
    document.querySelector("#order-history-list");


// =====================================================
// APP STATE
// =====================================================

let dishes = [];

let cart =
    JSON.parse(
        localStorage.getItem("addiseats_cart")
    ) || [];

let favorites =
    JSON.parse(
        localStorage.getItem("addiseats_favorites")
    ) || [];

let selectedCategory = "all";

let searchTerm = "";


// =====================================================
// LOAD MENU
// =====================================================

async function loadMenu() {

    try {

        const response =
            await fetch("data/menu.json");


        if (!response.ok) {

            throw new Error(
                "Failed to load menu"
            );

        }


        dishes =
            await response.json();


        console.log(
            "Dishes loaded:",
            dishes
        );


        loadingMessage.hidden = true;

        menuError.hidden = true;


        renderMenu();


    } catch (error) {

        console.error(
            "Menu error:",
            error
        );


        loadingMessage.hidden = true;

        menuError.hidden = false;

    }

}


// =====================================================
// RENDER MENU
// =====================================================

function renderMenu() {

    menuList.innerHTML = "";


    const filteredDishes =
        dishes.filter(function(dish) {

            const matchesCategory =
                selectedCategory === "all" ||
                dish.category === selectedCategory;


            const matchesSearch =
                dish.name
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    // NO RESULTS

    if (filteredDishes.length === 0) {

        menuEmpty.hidden = false;

        return;

    }


    menuEmpty.hidden = true;


    // CREATE FOOD CARDS

    filteredDishes.forEach(
        function(dish) {


            const menu =
                document.createElement("div");

            menu.classList.add(
                "food-card"
            );


            // =========================
            // IMAGE
            // =========================

            const image =
                document.createElement("img");

            image.src = dish.image;

            image.alt =
                dish.name;


            image.onerror =
                function() {

                    console.error(
                        "Image failed to load:",
                        dish.image
                    );

                };


            menu.append(image);


            // =========================
            // CONTENT
            // =========================

            const content =
                document.createElement("div");

            content.classList.add(
                "food-card-content"
            );


            // =========================
            // NAME
            // =========================

            const name =
                document.createElement("h3");

            name.textContent =
                dish.name;


            // =========================
            // DESCRIPTION
            // =========================

            const description =
                document.createElement("p");

            description.textContent =
                dish.description;


            // =========================
            // PRICE
            // =========================

            const price =
                document.createElement("strong");

            price.textContent =
                `${dish.price} ETB`;


            // =========================
            // ADD TO CART
            // =========================

            const button =
                document.createElement("button");

            button.type = "button";

            button.classList.add(
                "add-cart-button"
            );

            button.textContent =
                "🛒 Add to Cart";

            button.dataset.id =
                dish.id;


            button.addEventListener(
                "click",
                function() {

                    addToCart(dish.id);

                }
            );


            // =========================
            // FAVORITE
            // =========================

            const favoriteButton =
                document.createElement("button");

            favoriteButton.type = "button";

            favoriteButton.classList.add(
                "favorite-button"
            );


            const isFavorite =
                favorites.includes(dish.id);


            if (isFavorite) {

                favoriteButton.textContent =
                    "❤️ Favorite";

                favoriteButton.classList.add(
                    "active"
                );

            } else {

                favoriteButton.textContent =
                    "♡ Add to Favorites";

            }


            favoriteButton.addEventListener(
                "click",
                function() {

                    toggleFavorite(
                        dish.id
                    );

                }
            );


            // =========================
            // APPEND CONTENT
            // =========================

            content.append(name);

            content.append(description);

            content.append(price);

            content.append(button);

            content.append(
                favoriteButton
            );


            menu.append(content);

            menuList.append(menu);

        }
    );

}


// =====================================================
// SEARCH
// =====================================================

searchForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        searchTerm =
            searchInput.value.trim();


        renderMenu();

    }
);


// =====================================================
// LIVE SEARCH
// =====================================================

searchInput.addEventListener(
    "input",
    function() {

        searchTerm =
            searchInput.value.trim();


        renderMenu();

    }
);


// =====================================================
// CATEGORY FILTER
// =====================================================

categoryButtons.addEventListener(
    "click",
    function(event) {

        if (
            event.target.tagName !==
            "BUTTON"
        ) {

            return;

        }


        selectedCategory =
            event.target.dataset.category;


        renderMenu();


        // ACTIVE CATEGORY

        const buttons =
            categoryButtons.querySelectorAll(
                "button"
            );


        buttons.forEach(
            function(button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        event.target.classList.add(
            "active"
        );

    }
);


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(id) {

    const dish =
        dishes.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!dish) {

        return;

    }


    const existingItem =
        cart.find(
            function(item) {

                return item.id === id;

            }
        );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            ...dish,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

}


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

    localStorage.setItem(
        "addiseats_cart",
        JSON.stringify(cart)
    );

}


// =====================================================
// RENDER CART
// =====================================================

function renderCart() {

    cartList.innerHTML = "";


    cart.forEach(
        function(item) {


            const cartItem =
                document.createElement("li");


            // ITEM NAME

            const itemName =
                document.createElement("span");

            itemName.textContent =
                `${item.name} - ${item.price} ETB `;


            // MINUS

            const minusButton =
                document.createElement("button");

            minusButton.type = "button";

            minusButton.textContent =
                "-";


            minusButton.addEventListener(
                "click",
                function() {

                    decreaseQuantity(
                        item.id
                    );

                }
            );


            // QUANTITY

            const quantity =
                document.createElement("span");

            quantity.textContent =
                ` ${item.quantity} `;


            // PLUS

            const plusButton =
                document.createElement("button");

            plusButton.type = "button";

            plusButton.textContent =
                "+";


            plusButton.addEventListener(
                "click",
                function() {

                    increaseQuantity(
                        item.id
                    );

                }
            );


            // REMOVE

            const removeButton =
                document.createElement("button");

            removeButton.type = "button";

            removeButton.textContent =
                "Remove";


            removeButton.addEventListener(
                "click",
                function() {

                    removeFromCart(
                        item.id
                    );

                }
            );


            // APPEND

            cartItem.append(
                itemName
            );

            cartItem.append(
                minusButton
            );

            cartItem.append(
                quantity
            );

            cartItem.append(
                plusButton
            );

            cartItem.append(
                removeButton
            );


            cartList.append(
                cartItem
            );

        }
    );


    // =================================================
    // TOTAL
    // =================================================

    const total =
        cart.reduce(
            function(sum, item) {

                return sum +
                    (
                        item.price *
                        item.quantity
                    );

            },
            0
        );


    cartTotal.textContent =
        `${total} ETB`;


    saveCart();

}


// =====================================================
// INCREASE QUANTITY
// =====================================================

function increaseQuantity(id) {

    const item =
        cart.find(
            function(cartItem) {

                return cartItem.id === id;

            }
        );


    if (!item) {

        return;

    }


    item.quantity++;


    saveCart();

    renderCart();

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

function decreaseQuantity(id) {

    const item =
        cart.find(
            function(cartItem) {

                return cartItem.id === id;

            }
        );


    if (!item) {

        return;

    }


    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart =
            cart.filter(
                function(cartItem) {

                    return cartItem.id !== id;

                }
            );

    }


    saveCart();

    renderCart();

}


// =====================================================
// REMOVE FROM CART
// =====================================================

function removeFromCart(id) {

    cart =
        cart.filter(
            function(item) {

                return item.id !== id;

            }
        );


    saveCart();

    renderCart();

}


// =====================================================
// FAVORITES
// =====================================================

function toggleFavorite(id) {

    const exists =
        favorites.includes(id);


    if (exists) {

        favorites =
            favorites.filter(
                function(favoriteId) {

                    return favoriteId !== id;

                }
            );

    } else {

        favorites.push(id);

    }


    localStorage.setItem(
        "addiseats_favorites",
        JSON.stringify(favorites)
    );


    renderMenu();

}


// =====================================================
// CHECKOUT
// =====================================================

checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // CLEAR OLD MESSAGE

        checkoutMessage.textContent = "";


        // GET VALUES

        const name =
            customerName.value.trim();


        const phone =
            customerPhone.value.trim();


        const area =
            deliveryArea.value.trim();


        const instructions =
            specialInstructions.value.trim();


        // =================================================
        // NAME VALIDATION
        // =================================================

        if (name.length < 2) {

            checkoutMessage.textContent =
                "Please enter a valid name.";

            return;

        }


        // =================================================
        // PHONE VALIDATION
        // =================================================

        const phonePattern =
            /^(?:\+251|0)9\d{8}$/;


        if (
            !phonePattern.test(phone)
        ) {

            checkoutMessage.textContent =
                "Please enter a valid Ethiopian phone number.";

            return;

        }


        // =================================================
        // AREA VALIDATION
        // =================================================

        if (area.length < 2) {

            checkoutMessage.textContent =
                "Please enter your delivery area.";

            return;

        }


        // =================================================
        // CART VALIDATION
        // =================================================

        if (cart.length === 0) {

            checkoutMessage.textContent =
                "Your cart is empty.";

            return;

        }


        // =================================================
        // CALCULATE TOTAL
        // =================================================

        const total =
            cart.reduce(
                function(sum, item) {

                    return sum +
                        (
                            item.price *
                            item.quantity
                        );

                },
                0
            );


        // =================================================
        // CREATE ORDER
        // =================================================

        const order = {

            id: Date.now(),

            customer: {

                name: name,

                phone: phone,

                area: area

            },

            specialInstructions:
                instructions,

            items: cart.map(
                function(item) {

                    return {

                        id: item.id,

                        name: item.name,

                        price: item.price,

                        quantity:
                            item.quantity

                    };

                }
            ),

            total: total,

            status: "Pending",

            date:
                new Date().toISOString()

        };


        // =================================================
        // LOAD OLD ORDERS
        // =================================================

        const orders =
            JSON.parse(
                localStorage.getItem(
                    "addiseats_orders"
                )
            ) || [];


        // =================================================
        // SAVE NEW ORDER
        // =================================================

        orders.push(order);


        localStorage.setItem(
            "addiseats_orders",
            JSON.stringify(orders)
        );


        // =================================================
        // UPDATE ORDER HISTORY
        // =================================================

        renderOrderHistory();


        // =================================================
        // SHOW CONFIRMATION
        // =================================================

        orderConfirmation.hidden =
            false;


        checkout.hidden =
            true;


        confirmationMessage.textContent =
            `Thank you ${name}! Your order has been placed successfully. Order #${order.id}. Total: ${total} ETB.`;


        checkoutMessage.textContent =
            "";


        // =================================================
        // CLEAR CART
        // =================================================

        cart = [];


        saveCart();

        renderCart();


        // =================================================
        // RESET FORM
        // =================================================

        checkoutForm.reset();

    }
);


// =====================================================
// ORDER HISTORY
// =====================================================

function renderOrderHistory() {

    if (!orderHistoryList) {

        return;

    }


    orderHistoryList.innerHTML = "";


    const orders =
        JSON.parse(
            localStorage.getItem(
                "addiseats_orders"
            )
        ) || [];


    // NO ORDERS

    if (orders.length === 0) {

        const message =
            document.createElement("p");

        message.classList.add(
            "no-orders"
        );

        message.textContent =
            "You have no previous orders.";

        orderHistoryList.append(
            message
        );

        return;

    }


    // NEWEST FIRST

    const reversedOrders =
        [...orders].reverse();


    reversedOrders.forEach(
        function(order) {


            const card =
                document.createElement("div");

            card.classList.add(
                "order-card"
            );


            // ORDER ID

            const title =
                document.createElement("h3");

            title.textContent =
                `Order #${order.id}`;


            // CUSTOMER

            const customer =
                document.createElement("p");

            customer.textContent =
                `Customer: ${order.customer.name}`;


            // AREA

            const area =
                document.createElement("p");

            area.textContent =
                `Delivery Area: ${order.customer.area}`;


            // TOTAL

            const total =
                document.createElement("p");

            total.textContent =
                `Total: ${order.total} ETB`;


            // STATUS

            const status =
                document.createElement("span");

            status.classList.add(
                "order-status"
            );

            status.textContent =
                order.status || "Pending";


            // ITEMS TITLE

            const itemsTitle =
                document.createElement("p");

            itemsTitle.textContent =
                "Items:";


            // ITEMS LIST

            const itemsList =
                document.createElement("ul");


            order.items.forEach(
                function(item) {

                    const listItem =
                        document.createElement("li");

                    listItem.textContent =
                        `${item.name} × ${item.quantity}`;

                    itemsList.append(
                        listItem
                    );

                }
            );


            // SPECIAL INSTRUCTIONS

            if (
                order.specialInstructions
            ) {

                const instructions =
                    document.createElement("p");

                instructions.textContent =
                    `Instructions: ${order.specialInstructions}`;

                card.append(
                    instructions
                );

            }


            // DATE

            const date =
                document.createElement("p");


            if (order.date) {

                const orderDate =
                    new Date(order.date);


                date.textContent =
                    `Date: ${orderDate.toLocaleString()}`;

            }


            // APPEND

            card.append(title);

            card.append(customer);

            card.append(area);

            card.append(total);

            card.append(status);

            card.append(date);

            card.append(itemsTitle);

            card.append(itemsList);


            orderHistoryList.append(
                card
            );

        }
    );

}


// =====================================================
// START APP
// =====================================================

loadMenu();

renderCart();

renderOrderHistory();