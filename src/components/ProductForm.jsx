import React, { useState } from "react";
import { addProduct } from "../firebase/crud";

const initialState = {
  title: "",
  category: "",
  basePrice: "",
  baseCurrency: "USD",
  origin: "",
  rating: "",
  media: {
    image: "",
    videoReview: "",
  },
};

const ProductForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("media.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        media: {
          ...prev.media,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (formData.title.length < 4 || +formData.basePrice <= 0) {
      setError("Invalid product input");
      return;
    }

    try {
      await addProduct({
        ...formData,
        createdBy: "admin",
      });
      setFormData(initialState);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-4 rounded shadow bg-white"
    >
      <h2 className="text-lg font-semibold">Add Product</h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-2 border rounded"
      />
      <input
        name="basePrice"
        type="number"
        value={formData.basePrice}
        onChange={handleChange}
        placeholder="Base Price"
        className="w-full p-2 border rounded"
      />
      <input
        name="origin"
        value={formData.origin}
        onChange={handleChange}
        placeholder="Origin"
        className="w-full p-2 border rounded"
      />
      <input
        name="rating"
        type="number"
        value={formData.rating}
        onChange={handleChange}
        placeholder="Rating (0-5)"
        className="w-full p-2 border rounded"
      />
      <input
        name="media.image"
        value={formData.media.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full p-2 border rounded"
      />
      <input
        name="media.videoReview"
        value={formData.media.videoReview}
        onChange={handleChange}
        placeholder="YouTube Embed URL"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
