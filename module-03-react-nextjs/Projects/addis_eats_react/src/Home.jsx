import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getDishes from "./api/dishes";

function Home() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    async function loadDishes() {
      try {
        const data = await getDishes();
        setDishes(data);
      } catch (error) {
        console.error("Failed to load home dishes:", error);
      }
    }

    loadDishes();
  }, []);

  const specialIds = [1, 4, 5];

  const specialDishes = dishes.filter((dish) =>
    specialIds.includes(Number(dish.id)),
  );

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Welcome to Addis Eats</p>

          <h1>
            Authentic Ethiopian Food,
            <br />
            Delivered to You
          </h1>

          <p className="hero-description">
            Enjoy your favorite Ethiopian dishes, fresh, flavorful, and
            delivered to your door.
          </p>

          <Link to="/menu" className="hero-button">
            Explore Menu
          </Link>
        </div>
      </section>

      <section className="specials">
        <h2>Today's Specials</h2>

        <div className="specials-grid">
          {specialDishes.map((dish) => (
            <Link
              to={`/menu/${dish.id}`}
              className="special-card"
              key={dish.id}
            >
              <img src={dish.image} alt={dish.name} />

              <div className="special-card-content">
                <h3>{dish.name}</h3>

                <p>{dish.description}</p>

                <strong>{dish.price} ETB</strong>

                <span>View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-categories">
        <h2>Explore Our Menu</h2>

        <div className="category-links">
          <Link to="/menu?category=fast">Fasting</Link>

          <Link to="/menu?category=non-fast">Non-Fasting</Link>

          <Link to="/menu?category=drinks">Drinks</Link>
        </div>

        <Link to="/menu" className="browse-menu-button">
          Browse Full Menu
        </Link>
      </section>
    </div>
  );
}

export default Home;
