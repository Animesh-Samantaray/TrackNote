import React, { useContext } from 'react';
import AuthContext from '../store/authStore';
import { logout } from '../services/AuthService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const {
    isLoggedIn,
    user,
    setUser,
    setIsLoggedIn
  } = useContext(AuthContext);

  const onLogOut = async () => {
    try {
      await logout();

      setUser(null);
      setIsLoggedIn(false);

      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const onAddNote = () => {
    navigate('/add');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="cursor-pointer"
          >
            <h1 className="text-3xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              TrackNote
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {isLoggedIn && user && (
              <>
                <div className="hidden md:flex items-center px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-300 text-sm">
                    Welcome,
                  </span>

                  <span className="ml-2 text-violet-400 font-semibold">
                    {user.name}
                  </span>
                </div>

                <button
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-105 transition-all duration-200 text-white font-semibold shadow-lg shadow-violet-900/40"
                >
                  + Add Note
                </button>

                <button
                  onClick={onLogOut}
                  className="px-5 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              </>
            )}

            {!isLoggedIn && (
              <button
                onClick={() => navigate('/signin')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-105 transition-all duration-200 text-white font-semibold shadow-lg shadow-violet-900/40"
              >
                Sign In
              </button>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;