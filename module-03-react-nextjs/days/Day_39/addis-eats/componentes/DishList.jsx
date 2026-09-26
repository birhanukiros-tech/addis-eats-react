import Link from "next/link";
import Image from "next/image";

function DishList({ dishes }) {
  return (
    <ul className="dish-list">
      {dishes.map((dish) => (
        <li key={dish.id} className="dish-card">
          <Image src={dish.image} alt={dish.name} width={400} height={280} />

          <div className="dish-card-content">
            <Link href={`/menu/${dish.id}`} className="dish-name">
              {dish.name}
            </Link>

            <p className="dish-description">{dish.description}</p>

            <p className="dish-price">{dish.price} ETB</p>

            <div className="dish-meta">
              <span>{dish.category}</span>

              <span>{dish.spicy ? "🌶️ Spicy" : "Not Spicy"}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default DishList;
