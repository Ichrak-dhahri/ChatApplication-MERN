import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";

const Login = () => {
  const [userName,setUsername]=useState("");
  const [password,setPassword]=useState("");



  const {loading,login}=useLogin();
  const handleSubmit=async(e)=>{
e.preventDefault();
await login(userName,password)

  }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-4 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-2xl font-semibold text-center text-gray-300">
            Login <span className="text-purple-500">ChatApp</span>
          </h1>
          
      
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="UserName" className="mb-1 text-gray-300 font-semibold text-sm">
                    UserName
                  </label>
                  <input
                    id="username"
                    className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-2 shadow-md placeholder:text-sm border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="User name"
                    value={userName}
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="mb-1 text-gray-300 font-semibold text-sm">
                    Password
                  </label>
                  <input
                    id="password"
                    className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-2 shadow-md placeholder:text-sm border-gray-300 rounded-lg w-full"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-md mt-4 p-2 text-white rounded-lg w-full transition-transform duration-300 transform hover:scale-105"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <span className="loading loading-spinner"></span>: "Login"} 
                </button>
              </form>
              
              <div className="flex flex-col mt-3 items-center text-sm">
                <h3 className=" text-gray-300 font-semibold">Dont have an account?
                  <Link to={'/signup'}
                    className="text-blue-400 ml-1 hover:underline"
                    
                  >
                    Sign Up
                  </Link>
                </h3>
              </div>
          
        </div>
      </div>
    );
  };
  

export default Login
