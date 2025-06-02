// App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "./redux/uiSlice";
import { setUser, clearUser } from "./redux/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { ref, get } from "firebase/database";
import LoadingSpinner from "./components/LoadingSpinner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // ✅ now from Redux
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const { uid, email } = firebaseUser;

        // Fetch role from Firebase
        const snapshot = await get(ref(db, `roles/${uid}`));
        const role = snapshot.exists() ? snapshot.val() : "viewer";

        dispatch(setUser({ uid, email }));
        dispatch(setRole(role));
      } else {
        dispatch(clearUser());
        dispatch(setRole("viewer"));
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/signup" />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
