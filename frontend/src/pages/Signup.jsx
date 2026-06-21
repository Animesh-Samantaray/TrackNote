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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 px-4">
    <div className="w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>
          <p className="text-gray-300 mt-2">
            Join us and start your journey
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition-all duration-300 text-white font-semibold shadow-lg hover:scale-[1.02]"
          >
            Create Account
          </button>

          <p className="text-center text-gray-300">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-violet-400 hover:text-violet-300 font-medium"
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