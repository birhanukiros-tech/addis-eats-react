import { useEffect, useState } from "react";
import getDishes from "../api/dishes";
import Skeleton from "../ui/Skeleton";
import ErrorState from "../ui/ErrorState";
import DishForm from "./DishForm";
import Modal from "../ui/Modal";

function DishManager() {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingDish, setEditingDish] = useState(null);
    const [deletingDish, setDeletingDish] = useState(null);

    useEffect(() => {
        async function loadDishes() {
            try {
                const data = await getDishes();
                setDishes(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadDishes();
    }, []);

    function handleSave(dishData) {
        if (editingDish) {
            setDishes((currentDishes) =>
                currentDishes.map((dish) =>
                    dish.id === editingDish.id
                        ? { ...dish, ...dishData }
                        : dish
                )
            );
        } else {
            const newDish = {
                ...dishData,
                id: Date.now()
            };

            setDishes((currentDishes) => [
                ...currentDishes,
                newDish
            ]);
        }

        setShowForm(false);
        setEditingDish(null);
    }

    function handleEdit(dish) {
        setEditingDish(dish);
        setShowForm(true);
    }

    function handleCancel() {
        setShowForm(false);
        setEditingDish(null);
    }

    if (loading) {
        return (
            <div>
                <h1>Manage Menu</h1>
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        );
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    function handleDelete(){
        setDishes((currentDishes) =>
            currentDishes.filter(
                (dish) => dish.id !== deletingDish.id)
        );
        setDeletingDish(null);
    }
    return (
        <div className="admin-menu">
            <h1>Manage Menu</h1>

            {!showForm && (
                <button
                    type="button"
                    onClick={() => {
                        setEditingDish(null);
                        setShowForm(true);
                    }}
                >
                    Add New Dish
                </button>
            )}

            {showForm && (
                <DishForm
                    dish={editingDish}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}


         {deletingDish && (
            <Modal
                title="Delete Dish"
                onClose={() => setDeletingDish(null)} >

                <p>
                    Are you sure you want to delete{" "}
                    <strong>{deletingDish.name}</strong>?
                </p>

                <button
                    type="button"
                    onClick={handleDelete}>Confirm Delete</button>
            </Modal>
            )}
                    <div className="admin-dish-list">
                {dishes.map((dish) => (
                    <article
                        className="admin-dish-card"
                        key={dish.id}
                    >
                        <img
                            src={dish.image}
                            alt={dish.name}
                        />

                        <div>
                            <h2>{dish.name}</h2>
                            <p>{dish.price} ETB</p>
                            <p>Category: {dish.category}</p>

                            <button
                                type="button"
                                onClick={() => handleEdit(dish)}>Edit</button>

                            <button 
                            type="button" onClick={() =>setDeletingDish(dish)}>Delete</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default DishManager;