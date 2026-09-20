import { Link } from "react-router-dom";

function Home() {
  const specialDishes = [
    {
      id: 1,
      name: "Shiro",
      price: 200,
      image: "/images/shiro.png",
      description: "Smooth chickpea stew with Ethiopian spices.",
    },
    {
      id: 4,
      name: "Doro Wet",
      price: 600,
      image: "/images/doro_wet.png",
      description: "Classic Ethiopian chicken stew with berbere.",
    },
    {
      id: 5,
      name: "Kitfo",
      price: 500,
      image: "/images/kitfo.png",
      description: "Finely minced beef seasoned with Ethiopian spices.",
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Welcome to Addis Eats</p>

          <h1>Authentic Ethiopian Food,<br />Delivered to You</h1>

          <p className="hero-description">
            Enjoy your favorite Ethiopian dishes, fresh, flavorful, and
            delivered to your door.
          </p>

          <Link to="/menu" className="hero-button">Explore Menu</Link>
        </div>
      </section>

      <section className="specials">
        <h2>Today's Specials</h2>

        <div className="specials-grid">
          {specialDishes.map((dish) => (
            <article className="special-card" key={dish.id}>
              <img src={dish.image} alt={dish.name} />

              <div className="special-card-content">
                <h3>{dish.name}</h3>

                <p>{dish.description}</p>

                <strong>{dish.price} ETB</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-categories">
        <h2>Explore Our Menu</h2>

        <div className="category-links">
          <Link to="/menu?category=fasting">Fasting</Link>

          <Link to="/menu?category=non-fasting">Non-Fasting</Link>

          <Link to="/menu?category=drinks">Drinks</Link>
        </div>

        <Link to="/menu" className="browse-menu-button">Browse Full Menu</Link>
      </section>
    </div>
  );
}

export default Home;
