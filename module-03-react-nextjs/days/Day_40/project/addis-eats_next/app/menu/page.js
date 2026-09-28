import { getDishes } from "../../lib/dishes";
import DishCard from "../../components/DishCard";
import Link from "next/link";

export const revalidate = 3600;

async function MenuPage({ searchParams }) {
  const params = await searchParams;

  const category = params?.category || "all";
  const search = params?.search || "";

  const dishes = await getDishes();

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = category === "all" || dish.category === category;

    const searchText = search.toLowerCase();

    const matchesSearch =
      dish.name.toLowerCase().includes(searchText) ||
      dish.description.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  const categories = [
    { value: "all", label: "All Dishes" },
    { value: "fasting", label: "Fasting" },
    { value: "traditional", label: "Traditional" },
    { value: "breakfast", label: "Breakfast" },
    { value: "snacks", label: "Snacks" },
    { value: "fast-food", label: "Fast Food" },
    { value: "drinks", label: "Drinks" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          Addis Eats
        </p>

        <h1 className="mt-2 text-4xl font-bold">Our Menu</h1>

        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Explore authentic Ethiopian dishes, traditional favorites, refreshing
          drinks, and more.
        </p>
      </div>

      {/* Search */}
      <form action="/menu" className="mt-8 flex max-w-2xl gap-3">
        <input
          type="search"
          name="search"
          defaultValue={search}
          placeholder="🔎Search dishes..."
          className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 outline-none focus:border-[var(--primary)]"
        />

        {category !== "all" && (
          <input type="hidden" name="category" value={category} />
        )}

        <button
          type="submit"
          className="rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-white"
        >
          Search
        </button>
      </form>

      {/* Menu area */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Category Sidebar */}
        <aside className="h-fit rounded-xl border border-[var(--border)] bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold">Categories</h2>

          <nav className="mt-4 flex flex-col gap-2">
            {categories.map((item) => {
              const isActive = category === item.value;

              return (
                <Link
                  key={item.value}
                  href={
                    item.value === "all"
                      ? "/menu"
                      : `/menu?category=${item.value}`
                  }
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--text)] hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Dishes */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-[var(--muted)]">
              {filteredDishes.length}{" "}
              {filteredDishes.length === 1 ? "dish" : "dishes"} found
            </p>

            {search && (
              <p className="text-sm text-[var(--muted)]">
                Search: <strong>{search}</strong>
              </p>
            )}
          </div>

          {filteredDishes.length === 0 ? (
            <div className="rounded-xl border border-[var(--border)] bg-white px-6 py-16 text-center">
              <h2 className="text-2xl font-bold">No dishes found</h2>

              <p className="mt-3 text-[var(--muted)]">
                Try another search or choose a different category.
              </p>

              <Link
                href="/menu"
                className="mt-6 inline-block rounded-lg bg-[var(--primary)] px-5 py-3 font-semibold text-white"
              >
                View All Dishes
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MenuPage;
