async function getDishes() {

  const response = await fetch("/menu-data.json");

  if (!response.ok) {
    throw new Error("Failed to load dishes");
  }

  const dishes = await response.json();

  return dishes;
}

export default getDishes;
