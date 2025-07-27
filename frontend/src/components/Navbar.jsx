import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MediaTask</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/upload" className="hover:text-gray-200">Upload</Link>
              <Link to="/tasks" className="hover:text-gray-200">Tasks</Link>
              <button onClick={handleLogout} className="hover:text-gray-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/register" className="hover:text-gray-200">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;