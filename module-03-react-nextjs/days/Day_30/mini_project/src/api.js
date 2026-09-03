async function fetchDishes(category, signal) {
  
  const res = await fetch("/dishes.json", { signal });
  
  if (!res.ok) {
    throw new Error("🇪🇹 Could not load the Addis Eats menu. Please try again later!");
  }
  
  const allDishes = await res.json();
  
  if (category === "All") {
    return allDishes;
  } else {
    return allDishes.filter(d => d.category === category);
  }
}

export default fetchDishes;
