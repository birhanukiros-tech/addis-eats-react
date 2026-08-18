const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");
const facts = document.querySelector("#facts");

function render(label, value) {
    const p = document.createElement("p");

    p.textContent = `${label}: ${value}`;

    facts.append(p);
}

async function showCountry(name) {
    facts.textContent = "Loading...";

    try {
        const response = await fetch(
            `https://countries.dev/name/${name}`
        );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const [countryData] = await response.json();

        facts.innerHTML = "";

        render("Name", countryData.name);
        render("Capital", countryData.capital);
        render(
            "Population",
            countryData.population.toLocaleString()
        );
        render("Region", countryData.region);

        const currency = countryData.currencies[0];

        render(
            "Currency",
            `${currency.name} (${currency.code})`
        );

        const img = document.createElement("img");

        img.src = countryData.flag;
        img.alt = `${countryData.name} flag`;

        facts.append(img);

    } catch (error) {
        facts.textContent = error.message;
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const country = input.value.trim();

    if (country === "") {
        facts.textContent = "Please enter a country.";
        return;
    }

    showCountry(country);
});

showCountry("Ethiopia");