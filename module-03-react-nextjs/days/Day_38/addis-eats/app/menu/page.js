import Link from "next/link";
import DishList from "@/componentes/DishList";
import { getDishes } from "@/lib/dishes";
import CategoryBar from "@/componentes/CategoreyBar";
import FilterShall from "@/componentes/Filtershell";


export const revalidate = 3600;

export default async function MenuPage({ searchParams }) {
  const dishes = await getDishes();

  const params = await searchParams;

  const selectedCategory = params.category || "all";

  const filterdDishes = selectedCategory === "all" ?
  dishes: dishes.filter((dish) => dish.category === selectedCategory)

  return(
    <main>
      <h1>🍽️ Addis Eats Menu</h1>
      <Link href="/">Back to Home</Link>

      <div className="menu-layout">
      <CategoryBar />

      <h2>{selectedCategory === "all" ? "All Dishes":selectedCategory}</h2>
      
       <FilterShall>
         <DishList dishes={filterdDishes} />
       </FilterShall>
       </div>
    </main>
  );
}
  