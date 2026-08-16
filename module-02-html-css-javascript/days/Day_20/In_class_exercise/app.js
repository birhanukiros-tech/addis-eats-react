const status = document.querySelector("#status");
const dishList = document.querySelector("#dish-list");
const refreshButton = document.querySelector("#refresh");

const API_URL =
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";


async function load() {

    status.textContent = "Loading...";
    dishList.innerHTML = "";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch dishes");
        }

        const data = await response.json();

        data.meals.forEach((dish) => {

            const li = document.createElement("li");

            li.textContent = dish.strMeal;

            dishList.append(li);
        });

        status.textContent = "";

    } catch (error) {

        status.textContent =
            "Sorry, we could not load the dishes. Please try again.";

    }
}


refreshButton.addEventListener("click", load);

load();