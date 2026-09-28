import { readFile } from "fs/promises";
import path from "path";

export async function getDishes() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "menu-data.json"
    );

    const file = await readFile(filePath, "utf8");

    return JSON.parse(file);
  } catch (error) {
    console.error("Failed to load dishes:", error);
    throw new Error("Failed to load dishes");
  }
}

export async function getDishById(id) {
  const dishes = await getDishes();

  return dishes.find(
    (dish) => String(dish.id) === String(id)
  );
}