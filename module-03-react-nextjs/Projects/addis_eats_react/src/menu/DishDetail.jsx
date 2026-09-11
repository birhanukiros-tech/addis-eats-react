import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getDishes from "../api/dishes";
import Skeleton from "../ui/Skeleton";
import ErrorState from "../ui/ErrorState";

function DishDetail() {
    const { id } = useParams();

    const [dish, setDish] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadDish() {
            try {
                const dishes = await getDishes();

                const foundDish = dishes.find(
                    (dish) => dish.id === Number(id)
                );

                if (!foundDish) {
                    throw new Error("Dish not found");
                }

                setDish(foundDish);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadDish();
    }, [id]);

    if (loading) {
        return <Skeleton />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <div className="dish-detail">

            <img
                src={dish.image}
                alt={dish.name}
            />

            <div>
                <h1>{dish.name}</h1>

                <p>{dish.description}</p>

                <p>{dish.price} ETB</p>

                <p>Category: {dish.category}</p>

                {dish.spicy && (
                    <span>🌶️ Spicy</span>
                )}

                <button>
                    Add to Cart
                </button>
            </div>

        </div>
    );
}

export default DishDetail;