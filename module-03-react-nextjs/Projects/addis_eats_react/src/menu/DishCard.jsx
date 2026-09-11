function DishCard({ dish}) {
    return(
        <article className="dish-card">
            <img src={dish.image} alt={dish.name} />
            
            <div className="dish-card-content">
                <h2>{dish.name}</h2>

                <p>{dish.description}</p>

                <p>{dish.price} ETB</p>

                {dish.spicy && <span>🌶️ Spicy</span>}
            </div>
        </article>
    );
}
export default DishCard;