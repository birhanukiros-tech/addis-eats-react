import Link from "next/link";

function MenuPage() {
  const dishes = [
    {
      id: "kitfo",
      name: "Kitfo",
    },
    {
      id: "shiro",
      name: "Shiro",
    },
    {
      id: "firfir",
      name: "Firfir",
    },
  ];

  return (
    <main>
      <h1>Addis Eats Menu</h1>

      <Link href="/">
        Back to Home
      </Link>

      <h2>Dishes</h2>

      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            <Link href={`/menu/${dish.id}`}>
              {dish.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default MenuPage;