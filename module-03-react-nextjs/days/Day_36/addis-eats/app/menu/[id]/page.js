import { notFound } from "next/navigation";

async function DishPage({params}) {
  const {id} = await params;

  const validDishes = ["kitfo", "shiro", "firfir"];

   if(!validDishes.includes(id)) {
    notFound();
   }

   return(
    <main>
      <h1>Dish: {id}</h1>
      <p>This is the detail page for this dish</p>
    </main>
   );
}

export default DishPage;