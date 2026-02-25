import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ShelveForm from "./components/ShelveForm";

import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Persistent login handling
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Prevent flash while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <SignUp />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard userId={user.uid} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* /shelve still needs to render the Dashboard in the background! */}
        <Route
          path="/shelve"
          element={
            user ? (
              <>
                <Dashboard userId={user.uid} />
                <ShelveForm userId={user.uid} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;