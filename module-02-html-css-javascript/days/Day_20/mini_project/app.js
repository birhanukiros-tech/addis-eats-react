const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");
const facts = document.querySelector("#facts");

function render(label, value) {
  const p = document.createElement("p");

  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;

  p.append(strong, value);
  facts.append(p);
}

async function showCountry(name) {
  facts.textContent = "Loading...";

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${name}`
    );

    if (!res.ok) {
      throw new Error("Country not found");
    }

    const [country] = await res.json();

    facts.innerHTML = "";

    render("Capital", country.capital[0]);
    render("Population", country.population.toLocaleString());
    render("Region", country.region);

    const currencies = Object.values(country.currencies)
      .map(currency => `${currency.name} (${currency.symbol || ""})`)
      .join(", ");

    render("Currencies", currencies);

    const flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = `${country.name.common} flag`;
    flag.width = 200;

    facts.append(flag);

  } catch (error) {
    facts.textContent = "Country not found. Please try again.";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const countryName = input.value.trim();

  if (countryName === "") {
    facts.textContent = "Please enter a country name.";
    return;
  }

  showCountry(countryName);
});

// Show Ethiopia when the page opens
showCountry("Ethiopia");