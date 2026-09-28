"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "../../components/FavoritesProvider";
import AddToCartButton from "../../components/AddToCartButton";

function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="text-6xl">♡</div>

        <h1 className="mt-6 text-3xl font-bold">No favorites yet</h1>

        <p className="mx-auto mt-3 max-w-lg text-[var(--muted)]">
          Save your favorite dishes here so you can easily find them again.
        </p>

        <Link
          href="/menu"
          className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-white"
        >
          Explore Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
            Addis Eats
          </p>

          <h1 className="mt-2 text-4xl font-bold">My Favorites</h1>

          <p className="mt-3 text-[var(--muted)]">
            Your saved dishes in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={clearFavorites}
          className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          Clear Favorites
        </button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((dish) => (
          <article
            key={dish.id}
            className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm"
          >
            <div className="relative h-56">
              <Image
                src={`/${dish.image}`}
                alt={dish.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold">{dish.name}</h2>

              <p className="mt-2 text-[var(--muted)]">{dish.description}</p>

              <p className="mt-4 font-bold text-[var(--primary)]">
                {dish.price} ETB
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <AddToCartButton dish={dish} />

                <Link
                  href={`/menu/${dish.id}`}
                  className="rounded-lg border border-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary)]"
                >
                  View Details
                </Link>

                <button
                  type="button"
                  onClick={() => removeFavorite(dish.id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FavoritesPage;
