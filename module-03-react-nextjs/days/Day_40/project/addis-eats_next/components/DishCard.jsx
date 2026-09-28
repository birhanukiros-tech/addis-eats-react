import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";

function DishCard({ dish }) {
  return (
    <article className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">

      <div className="relative h-56 w-full">
        <Image
          src={`/${dish.image}`}
          alt={dish.name}
          fill
          className="object-cover"
        />

        <div className="absolute right-4 top-4">
          <FavoriteButton dish={dish} />
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold">
          {dish.name}
        </h2>

        <p className="mt-2 text-[var(--muted)]">
          {dish.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <p className="font-bold text-[var(--primary)]">
            {dish.price} ETB
          </p>

            <AddToCartButton dish ={dish} />
          <Link
            href={`/menu/${dish.id}`}
            className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
          >
            View Details
          </Link>
        </div>
      </div>

    </article>
  );
}

export default DishCard;