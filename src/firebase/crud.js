import { db } from "./config";
import { ref, push, set, update, remove, onValue } from "firebase/database";

// Create
export const addProduct = async (product) => {
  const productRef = push(ref(db, "products"));
  const newProduct = { ...product, id: productRef.key, timestamp: Date.now() };
  await set(productRef, newProduct);
  return newProduct;
};

// Read (real-time)
export const subscribeToProducts = (callback) => {
  const productsRef = ref(db, "products");
  return onValue(productsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const productList = Object.values(data);
    callback(productList);
  });
};

// Update
export const updateProduct = async (id, updatedData) => {
  await update(ref(db, `products/${id}`), updatedData);
};

// Delete
export const deleteProduct = async (id) => {
  await remove(ref(db, `products/${id}`));
};
