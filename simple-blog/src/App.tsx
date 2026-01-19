import './App.css'
import { Route, Routes, Link } from 'react-router-dom';
import Register from './features/auth/Register';
import { supabase } from './supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/auth/authSlice';
import type { RootState } from './app/store';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(logout());
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/register">Register</Link>
        {isAuthenticated && (
          <> | <button onClick={handleLogout}>Logout</button></>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome!</h1>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
