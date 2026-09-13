import { useEffect, useState } from "react";

function DishForm({ dish, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "fast",
        spicy: false,
        image: ""
    });

    useEffect(() => {
        if (dish) {
            setFormData({
                name: dish.name,
                description: dish.description,
                price: dish.price,
                category: dish.category,
                spicy: dish.spicy,
                image: dish.image
            });
        }
    }, [dish]);

    function handleChange(event) {
        const { name, value, type, checked } = event.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSave({
            ...formData,
            price: Number(formData.price)
        });
    }

    return (
        <form onSubmit={handleSubmit} className="dish-form">
            <h2>{dish ? "Edit Dish" : "Add New Dish"}</h2>

            <div className="admin-dish-form">
            <div className="form-field">
                <label htmlFor="name">Dish Name</label>
                <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required />
            </div>

            <div className="form-field">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required />
            </div>

            <div className="form-field">
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    required />
            </div>

            <div className="form-field">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange} >

                    <option value="fast">Fast</option>
                    <option value="non-fast">Non-Fast</option>
                    <option value="drinks">Drinks</option>
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="image">Image Path</label>
                <input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="/images/dish.png" />
            </div>

            <div className="form-field">
                <label  className="spicy-checkbox">
                    <input
                        type="checkbox"
                        name="spicy"
                        checked={formData.spicy}
                        onChange={handleChange}/>
                    Spicy
                </label>
            </div>

            <button type="submit">
                {dish ? "Update Dish" : "Add Dish"}
            </button>

            <button
                type="button"
                onClick={onCancel} >
                Cancel
            </button>
            </div>
        </form>
    );
}

export default DishForm;