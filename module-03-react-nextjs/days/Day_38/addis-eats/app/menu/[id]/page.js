import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDishes } from "@/lib/dishes";

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: String(dish.id),
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dishes = await getDishes();

  const dish = dishes.find(
    (dish) => String(dish.id) === id
  );

  if (!dish) {
    notFound();
  }

  return (
    <article className="dish-detail">
      <Link href="/menu">← Back to Menu</Link>

      <Image
        src={dish.image}
        alt={dish.name}
        width={600}
        height={400}
      />

      <h1>{dish.name}</h1>

      <p>{dish.description}</p>

      <p>{dish.price} ETB</p>

      <p>Category: {dish.category}</p>

      <p>
        {dish.spicy ? "🌶️ Spicy" : "Not Spicy"}
      </p>
    </article>
  );
}