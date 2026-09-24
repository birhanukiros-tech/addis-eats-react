import Link from "next/link";
import Image from "next/image";

function DishList({ dishes }) {
  return (
    <ul>
      {dishes.map((dish) => (
        <li key={dish.id}>
          <Image src={dish.image} alt={dish.name} width={200} height={150} />

          <Link href={`/menu/${dish.id}`}>{dish.name}</Link>

          <p>{dish.description}</p>

          <p>{dish.price} ETB</p>

          <p>Category: {dish.category}</p>

          <p>{dish.spicy ? "🌶️ Spicy" : "Not Spicy"}</p>
        </li>
      ))}
    </ul>
  );
}
export default DishList;
