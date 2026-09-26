import Link from "next/link";
import DishList from "@/componentes/DishList";
import { getDishes } from "@/lib/dishes";
import FilterShall from "@/componentes/Filtershell";

export const revalidate = 3600;

export default async function MenuPage({ searchParams }) {
  const dishes = await getDishes();

  const params = await searchParams;

  const selectedCategory = params.category || "all";

  const filteredDishes =
    selectedCategory === "all"
      ? dishes
      : dishes.filter(
          (dish) => dish.category === selectedCategory
        );

  return (
    <section>
      <h1>🍽️ Addis Eats Menu</h1>

      <Link href="/">Back to Home</Link>

      <h2>
        {selectedCategory === "all"
          ? "All Dishes"
          : selectedCategory}
      </h2>

     <FilterShall>
      <DishList dishes={filteredDishes} />
     </FilterShall>
    </section>
  );
}