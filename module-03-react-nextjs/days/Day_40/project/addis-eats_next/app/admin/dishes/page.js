"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const DISHES_STORAGE_KEY = "addis_eats_admin_dishes";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: "",
  image: "",
  spicy: false,
};

const CATEGORIES = [
  "fasting",
  "traditional",
  "breakfast",
  "snacks",
  "fast-food",
  "drinks",
];

function AdminDishesPage() {
  const [dishes, setDishes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [dishToDelete, setDishToDelete] = useState(null);

  /*
   * Load dishes
   */
  useEffect(() => {
    async function loadDishes() {
      try {
        const savedDishes = localStorage.getItem(DISHES_STORAGE_KEY);

        if (savedDishes) {
          setDishes(JSON.parse(savedDishes));
        } else {
          const response = await fetch("/menu-data.json");

          if (!response.ok) {
            throw new Error("Failed to load dishes");
          }

          const data = await response.json();

          const dishesWithStatus = data.map((dish) => ({
            ...dish,
            enabled: true,
          }));

          setDishes(dishesWithStatus);
        }
      } catch (error) {
        console.error("Failed to load admin dishes:", error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadDishes();
  }, []);

  /*
   * Save dishes
   */
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(DISHES_STORAGE_KEY, JSON.stringify(dishes));
    } catch (error) {
      console.error("Failed to save admin dishes:", error);
    }
  }, [dishes, isLoaded]);

  /*
   * Open Add Dish form
   */
  function openAddForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setIsFormOpen(true);
  }

  /*
   * Change form field
   */
  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  /*
   * Validate form
   */
  function validateForm() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Dish name is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!form.price) {
      newErrors.price = "Price is required.";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }

    if (!form.category) {
      newErrors.category = "Please select a category.";
    }

    if (!form.image.trim()) {
      newErrors.image = "Image path is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  /*
   * Add / Edit dish
   */
  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingId !== null) {
      setDishes((currentDishes) =>
        currentDishes.map((dish) =>
          dish.id === editingId
            ? {
                ...dish,
                name: form.name.trim(),
                description: form.description.trim(),
                price: Number(form.price),
                category: form.category,
                image: form.image.trim(),
                spicy: form.spicy,
              }
            : dish,
        ),
      );
    } else {
      const newDish = {
        id: Date.now(),
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        category: form.category,
        image: form.image.trim(),
        spicy: form.spicy,
        enabled: true,
      };

      setDishes((currentDishes) => [...currentDishes, newDish]);
    }

    closeForm();
  }

  /*
   * Close form
   */
  function closeForm() {
    setForm(EMPTY_FORM);
    setErrors({});
    setEditingId(null);
    setIsFormOpen(false);
  }

  /*
   * Edit dish
   */
  function handleEdit(dish) {
    setEditingId(dish.id);

    setForm({
      name: dish.name || "",
      description: dish.description || "",
      price: dish.price ?? "",
      category: dish.category || "",
      image: dish.image || "",
      spicy: Boolean(dish.spicy),
    });

    setErrors({});
    setIsFormOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /*
   * Open delete confirmation
   */
  function requestDelete(dish) {
    setDishToDelete(dish);
  }

  /*
   * Confirm delete
   */
  function handleDelete() {
    if (!dishToDelete) return;

    setDishes((currentDishes) =>
      currentDishes.filter((dish) => dish.id !== dishToDelete.id),
    );

    if (editingId === dishToDelete.id) {
      closeForm();
    }

    setDishToDelete(null);
  }

  /*
   * Enable / Disable dish
   */
  function toggleDish(dishId) {
    setDishes((currentDishes) =>
      currentDishes.map((dish) =>
        dish.id === dishId
          ? {
              ...dish,
              enabled: !dish.enabled,
            }
          : dish,
      ),
    );
  }

  if (!isLoaded) {
    return (
      <section className="px-8 py-10">
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-[var(--muted)]">Loading dishes...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-8 sm:px-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
            Menu Management
          </p>

          <h1 className="mt-2 text-4xl font-bold">Dishes</h1>

          <p className="mt-2 text-[var(--muted)]">
            Add, edit, remove and manage your restaurant dishes.
          </p>
        </div>

        {!isFormOpen && (
          <button
            type="button"
            onClick={openAddForm}
            className="rounded-lg bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            + Add Dish
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {isFormOpen && (
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold">
                {editingId !== null ? "Edit Dish" : "Add New Dish"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingId !== null
                  ? "Update the dish information below."
                  : "Enter the information for the new dish."}
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-7">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-2 block font-semibold">
                  Dish Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Doro Wot"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-[var(--primary)]/20 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1.5 text-sm font-medium text-red-600">
                    ⚠ {errors.name}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="mb-2 block font-semibold">
                  Price (ETB)
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 500"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-[var(--primary)]/20 ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.price && (
                  <p className="mt-1.5 text-sm font-medium text-red-600">
                    ⚠ {errors.price}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="mb-2 block font-semibold">
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-[var(--primary)]/20 ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select category</option>

                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category
                        .replace("-", " ")
                        .replace(/\b\w/g, (letter) => letter.toUpperCase())}
                    </option>
                  ))}
                </select>

                {errors.category && (
                  <p className="mt-1.5 text-sm font-medium text-red-600">
                    ⚠ {errors.category}
                  </p>
                )}
              </div>

              {/* Image */}
              <div>
                <label htmlFor="image" className="mb-2 block font-semibold">
                  Image Path
                </label>

                <input
                  id="image"
                  name="image"
                  type="text"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="images/doro-wet.png"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-[var(--primary)]/20 ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.image && (
                  <p className="mt-1.5 text-sm font-medium text-red-600">
                    ⚠ {errors.image}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block font-semibold"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the dish..."
                  rows={4}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-[var(--primary)]/20 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.description && (
                  <p className="mt-1.5 text-sm font-medium text-red-600">
                    ⚠ {errors.description}
                  </p>
                )}
              </div>

              {/* Spicy */}
              <div className="md:col-span-2">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    name="spicy"
                    type="checkbox"
                    checked={form.spicy}
                    onChange={handleChange}
                    className="h-5 w-5 accent-[var(--primary)]"
                  />

                  <span className="font-semibold">🌶️ This dish is spicy</span>
                </label>
              </div>
            </div>

            {/* Form buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                {editingId !== null ? "Update Dish" : "Add Dish"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Dish List */}
      <div className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-5 sm:px-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">All Dishes</h2>

              <p className="mt-1 text-sm text-gray-500">
                {dishes.length} dishes
              </p>
            </div>
          </div>
        </div>

        {dishes.length === 0 ? (
          <div className="px-7 py-16 text-center">
            <div className="text-5xl">🍽️</div>

            <h3 className="mt-4 text-xl font-bold">No dishes found</h3>

            <p className="mt-2 text-gray-500">
              Add your first dish using the button above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-sm text-gray-500">
                  <th className="px-5 py-4">Dish</th>

                  <th className="px-5 py-4">Category</th>

                  <th className="px-5 py-4">Price</th>

                  <th className="px-5 py-4">Status</th>

                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {dishes.map((dish) => (
                  <tr key={dish.id} className="border-b last:border-b-0">
                    {/* Dish */}
                    <td className="px-5 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={`/${dish.image}`}
                            alt={dish.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold">{dish.name}</p>

                          <p className="mt-1 max-w-[220px] truncate text-sm text-gray-500">
                            {dish.description}
                          </p>

                          {dish.spicy && (
                            <span className="text-xs text-red-600">
                              🌶️ Spicy
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-sm capitalize">
                        {dish.category.replace("-", " ")}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="whitespace-nowrap px-5 py-4 font-semibold">
                      {dish.price} ETB
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => toggleDish(dish.id)}
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold ${
                          dish.enabled
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {dish.enabled ? "Enabled" : "Disabled"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(dish)}
                          className="whitespace-nowrap rounded-lg border border-[var(--primary)] px-3 py-2 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => requestDelete(dish)}
                          className="whitespace-nowrap rounded-lg border border-red-500 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {dishToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                🗑️
              </div>

              <h2 className="mt-5 text-2xl font-bold">Delete Dish?</h2>

              <p className="mt-3 text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">
                  {dishToDelete.name}
                </span>
                ?
              </p>

              <p className="mt-2 text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => setDishToDelete(null)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminDishesPage;
