import React, { useContext ,useState} from 'react'
import AuthContext from '../store/authStore.jsx'
import { signup } from '../services/AuthService';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Signup = () => {
   const {setUser , setIsLoggedIn,navigate} = useContext(AuthContext);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const onSubmit=async(e)=>{
    try {
      e.preventDefault();
      const data={name , email , password};
      const response=await signup(data);
      console.log(response);
      if(response){
        setUser(response.user);
        setIsLoggedIn(true);
        navigate("/");
        toast.success("Signup successful");
      }
    } catch (error) {
      toast.error(error.message);
    }
   }
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 px-4 relative overflow-hidden py-10">
    
    {/* Background Glow */}
    <div className="fixed top-20 left-10 w-80 h-80 bg-violet-600/20 blur-3xl rounded-full opacity-40"></div>
    <div className="fixed bottom-20 right-10 w-80 h-80 bg-cyan-600/20 blur-3xl rounded-full opacity-40"></div>

    <div className="relative w-full max-w-md">
      <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/80 to-purple-900/30 border border-violet-500/30 rounded-3xl p-10 shadow-2xl shadow-violet-500/10">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-slate-300 mt-3 text-lg">
            Join us and start your journey
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">

          <div>
            <label className="block text-sm text-slate-300 mb-2 font-semibold tracking-wide">
              👤 Full Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-violet-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2 font-semibold tracking-wide">
              📧 Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-violet-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2 font-semibold tracking-wide">
              🔐 Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-violet-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 transition-all duration-300 text-white font-bold shadow-lg hover:shadow-violet-500/50 hover:scale-[1.02]"
          >
            Create Account
          </button>

          <p className="text-center text-slate-300">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200"
            >
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </div>
  </div>
);
}

export default Signup