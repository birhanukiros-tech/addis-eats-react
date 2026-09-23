import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
export const revalidate = 3600;

const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    image:"/images/kitfo.png",
  },
  {
    id: "shiro",
    name: "Shiro",
    image: "/images/shiro.png",
  },
  {
    id: "firfir",
    name: "Firfir",
    image:"/images/firfir.png"
  },
];
function DishSkeleton() {
  return (
    <div className="dish-skeleton-grid">
      <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
      </div>

      <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
      </div>

      <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
      </div>
    </div>
  );
}

async function DishList() {
  // Simulate a slow server/data request for the exercise.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <ul>
      {dishes.map((dish) => (
        <li key={dish.id}>

          <Image
            src={dish.image}
            alt={dish.name}
            width={200}
            height={150}
          />
          <Link href={`/menu/${dish.id}`}>
            {dish.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MenuPage() {
  return (
    <main>
      <h1>Addis Eats Menu</h1>

      <Link href="/">
        Back to Home
      </Link>

      <h2>Dishes</h2>

      <Suspense fallback={<DishSkeleton />}>
        <DishList />
      </Suspense>
    </main>
  );
}

export default MenuPage;