import { notFound } from "next/navigation";

const validDishes = ["kitfo", "shiro", "firfir"];

export async function generateStaticParams() {
  return validDishes.map((id) => ({
    id,
  }));
}

async function DishPage({ params }) {
  const { id } = await params;

  if (!validDishes.includes(id)) {
    notFound();
  }

  return (
    <main>
      <h1>Dish: {id}</h1>
      <p>This is the detail page for this dish</p>
    </main>
  );
}

export default DishPage;