import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToProducts } from "../firebase/crud";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { clearUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const role = useSelector((state) => state.ui.role);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToProducts(setProducts);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const getAnalytics = () => {
    const count = products.length;
    const totalValue = products.reduce(
      (acc, p) => acc + parseFloat(p.convertedPrice || p.price || 0),
      0
    );
    const avgPrice = count ? (totalValue / count).toFixed(2) : 0;

    const categoryCount = {};
    const originCount = {};
    const originTotal = {};

    let mostExpensiveProduct = null;

    for (let product of products) {
      const cat = product.category || "Unknown";
      const origin = product.origin || "Unknown";
      const price = parseFloat(product.convertedPrice || product.price || 0);

      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      originCount[origin] = (originCount[origin] || 0) + 1;
      originTotal[origin] = originTotal[origin] || [];
      originTotal[origin].push(price);

      if (!mostExpensiveProduct || price > mostExpensiveProduct.price) {
        mostExpensiveProduct = { name: product.name, price };
      }
    }

    const mostCommonCategory =
      Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "N/A";

    const top3Origins = Object.entries(originCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);

    const cheapestOrigin =
      Object.entries(originTotal)
        .map(([origin, prices]) => ({
          origin,
          avg: prices.reduce((a, b) => a + b, 0) / prices.length,
        }))
        .sort((a, b) => a.avg - b.avg || a.origin.localeCompare(b.origin))[0]
        ?.origin || "N/A";

    return {
      count,
      totalValue: totalValue.toFixed(2),
      avgPrice,
      mostCommonCategory,
      top3Origins,
      cheapestOrigin,
      mostExpensiveProduct,
    };
  };

  const analytics = getAnalytics();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow flex justify-between items-center px-4 py-3 mb-4">
        <div>
          <h1 className="text-xl font-bold text-blue-700">GlobexMart Pro</h1>
          <p className="text-sm text-gray-600">
            Role: <span className="font-medium">{role}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-700">
              Logged in as: <b>{user.email}</b>
            </span>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="px-4 pb-10 max-w-6xl mx-auto">
        {/* Admin-only Product Form */}
        {role === "admin" && (
          <div className="mb-6">
            <button
              onClick={toggleForm}
              className="bg-blue-600 text-white px-4 py-2 rounded mb-3"
            >
              {showForm ? "Hide Form" : "Add Product"}
            </button>
            {showForm && <ProductForm />}
          </div>
        )}

        {/* Real-Time Analytics Panel */}
        <div className="bg-white shadow p-4 rounded mb-6">
          <h2 className="text-lg font-bold mb-2">Real-Time Analytics</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-800">
            <li>Total Products: {analytics.count}</li>
            <li>Total Value: ${analytics.totalValue}</li>
            <li>Average Price: ${analytics.avgPrice}</li>
            <li>Most Common Category: {analytics.mostCommonCategory}</li>
            <li>Top 3 Origins: {analytics.top3Origins.join(", ")}</li>
            <li>Cheapest Origin: {analytics.cheapestOrigin}</li>
            <li>
              Most Expensive Product:{" "}
              {analytics.mostExpensiveProduct
                ? `${analytics.mostExpensiveProduct.name} ($${analytics.mostExpensiveProduct.price})`
                : "N/A"}
            </li>
          </ul>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} role={role} />
            ))
          ) : (
            <p className="text-gray-600">No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
