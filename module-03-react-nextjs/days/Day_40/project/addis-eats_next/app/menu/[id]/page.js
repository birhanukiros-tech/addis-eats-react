import Image from "next/image";
import { notFound } from "next/navigation";
import { getDishById, getDishes } from "../../../lib/dishes";


export async function generateStaticparams(){
    const dishes = await getDishes();
    return dishes.map((dish) =>({id:String(dish.id)}));
}
async function DishDetailsPage({ params }) {
  const { id } = await params;

  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-xl">
          <Image
            src={`/${dish.image}`}
            alt={dish.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-[var(--primary)]">
            Addis Eats
          </p>

          <h1 className="mt-2 text-4xl font-bold">{dish.name}</h1>

          <p className="mt-4 text-[var(--muted)]">{dish.description}</p>

          <p className="mt-6 text-2xl font-bold text-[var(--primary)]">
            {dish.price} ETB
          </p>

          {dish.spicy && (
            <p className="mt-3 font-semibold text-red-600">🌶️ Spicy</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default DishDetailsPage;
