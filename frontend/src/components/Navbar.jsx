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
    setIsLoggedIn,
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
    <nav className="sticky top-0 z-50">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 opacity-95" />
      
      {/* Animated Border Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="absolute -bottom-1 left-0 right-0 h-px blur-sm bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Content */}
      <div className="relative backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer group flex items-center gap-2"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">📝</div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent hover:from-cyan-400 hover:via-fuchsia-400 hover:to-violet-400 transition-all duration-500">
                TrackNote
              </h1>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">

              {isLoggedIn && user && (
                <>
                  <div className="hidden md:flex items-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/30 backdrop-blur-sm group hover:border-violet-400/60 transition-all duration-300">
                    <span className="text-slate-300 text-sm font-medium">
                      Welcome,
                    </span>

                    <span className="ml-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-bold">
                      {user.name}
                    </span>
                  </div>

                  <button
                    onClick={onAddNote}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 hover:shadow-lg hover:shadow-violet-500/50 text-white font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-2 group"
                  >
                    <span className="group-hover:rotate-180 transition-transform duration-300">+</span> Add Note
                  </button>

                  <button
                    onClick={onLogOut}
                    className="px-5 py-2.5 rounded-xl border-2 border-red-500/50 bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200 font-semibold hover:scale-105"
                  >
                    Logout
                  </button>
                </>
              )}

              {!isLoggedIn && (
                <button
                  onClick={() => navigate('/signin')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 hover:shadow-lg hover:shadow-violet-500/50 text-white font-semibold transition-all duration-200 hover:scale-105"
                >
                  Sign In
                </button>
              )}

            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;