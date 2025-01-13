import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Home from './pages/Home';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ItemForm from './components/items/ItemForm';
import ItemDetail from './pages/ItemDetail';
import Profile from './pages/Profile';
import SettleDowns from './pages/SettleDowns';
import Notifications from './pages/Notifications';
import Landing from './pages/WelcomePage'; // Assuming the WelcomePage component

function App() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    // Fetch the session and update user state on app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          full_name: session.user.user_metadata.full_name,
          email_verified: session.user.email_verified,
          created_at: session.user.created_at,
        });
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          full_name: session.user.user_metadata.full_name,
          email_verified: session.user.email_verified,
          created_at: session.user.created_at,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Welcome Page */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Landing />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <LoginForm />}
        />

        {/* Sign Up */}
        <Route
          path="/signup"
          element={user ? <Navigate to="/home" /> : <SignUpForm />}
        />

        {/* Authenticated Routes */}
        <Route path="/" element={user ? <Layout /> : <Navigate to="/" />}>
          <Route path="home" element={<Home />} />
          <Route path="items/new" element={<ItemForm />} />
          <Route path="items/:id" element={<ItemDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settledowns" element={<SettleDowns />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
