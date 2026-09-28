import Image from "next/image";
import Link from "next/link";
import { getDishes } from "../lib/dishes";

async function HomePage() {
  const dishes = await getDishes();

  const specials = dishes.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src="/images/hero-food.jpg"
          alt="Ethiopian food"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-20">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Addis Eats
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">
              Authentic Ethiopian Food, Made With Love
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/90">
              Discover traditional Ethiopian flavors and delicious favorites
              prepared for you in the heart of Addis Ababa.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-black"
              >
                Explore Menu
              </Link>

              <Link
                href="/menu"
                className="rounded-lg border border-white px-6 py-3 font-semibold text-white"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Specials */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
            Addis Eats
          </p>

          <h2 className="mt-2 text-4xl font-bold">Today's Specials</h2>

          <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
            Enjoy some of our favorite Ethiopian dishes prepared with
            traditional flavors.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {specials.map((dish) => (
            <article
              key={dish.id}
              className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm"
            >
              <div className="relative h-64">
                <Image
                  src={`/${dish.image}`}
                  alt={dish.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">{dish.name}</h3>

                <p className="mt-2 text-[var(--muted)]">{dish.description}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="font-bold text-[var(--primary)]">
                    {dish.price} ETB
                  </span>

                  <Link
                    href={`/menu/${dish.id}`}
                    className="font-semibold text-[var(--primary)]"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-white"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* Why Addis Eats */}
      <section className="border-y bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Why Addis Eats?</h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <h3 className="text-xl font-bold">Authentic Flavors</h3>
              <p className="mt-3 text-[var(--muted)]">
                Traditional Ethiopian dishes prepared with familiar ingredients
                and flavors.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold">Freshly Prepared</h3>
              <p className="mt-3 text-[var(--muted)]">
                Quality food prepared with care for every order.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold">Easy Ordering</h3>
              <p className="mt-3 text-[var(--muted)]">
                Browse, choose your favorites, and place your order easily.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
