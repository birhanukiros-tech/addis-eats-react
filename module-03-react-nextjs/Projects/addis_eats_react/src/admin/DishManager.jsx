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
          dish.id === editingDish.id ? { ...dish, ...dishData } : dish,
        ),
      );
    } else {
      const newDish = {
        ...dishData,
        id: Date.now(),
      };

      setDishes((currentDishes) => [...currentDishes, newDish]);
    }

    setShowForm(false);
    setEditingDish(null);
  }

  function handleEdit(dish) {
    setEditingDish(dish);
    setShowForm(true);

    setTimeout(() => {
        document
            .querySelector(".dish-form")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

  }

  function handleCancel() {
    setShowForm(false);
    setEditingDish(null);
  }

  function handleDelete() {
    setDishes((currentDishes) =>
      currentDishes.filter((dish) => dish.id !== deletingDish.id),
    );

    setDeletingDish(null);
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

  return (
    <div className="admin-menu">
      <h1>Manage Menu</h1>

      {!showForm && (
        <button
          className="admin-menu-add"
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
        <Modal title="Delete Dish" onClose={() => setDeletingDish(null)}>
          <p>
            Are you sure you want to delete <strong>{deletingDish.name}</strong>
            ?
          </p>

          <button
            className="confirm-delete-button"
            type="button"
            onClick={handleDelete}
          >
            Confirm Delete
          </button>
        </Modal>
      )}

      <div className="admin-menu-list">
        {dishes.map((dish) => (
          <article className="admin-menu-card" key={dish.id}>
            <img
              className="admin-menu-image"
              src={dish.image}
              alt={dish.name}
            />

            <div className="admin-menu-details">
              <h2>{dish.name}</h2>
              <p>{dish.price} ETB</p>
              <p>Category: {dish.category}</p>

              <div className="admin-menu-actions">
                <button
                  className="admin-menu-edit"
                  type="button"
                  onClick={() => handleEdit(dish)}
                >
                  Edit
                </button>

                <button
                  className="admin-menu-delete"
                  type="button"
                  onClick={() => setDeletingDish(dish)}>
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default DishManager;
