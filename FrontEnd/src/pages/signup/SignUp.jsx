import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckBox.jsx";
import { useState } from "react";
import useSignUp from "../../Hooks/useSignUp.js";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',  // Changed from username to userName
    password: '',
    confimPassword: '',  // Changed from confirmPassword to confimPassword
    gender: ''
  });
  
  const { loading, signup } = useSignUp();

  const handleCheckboxChange = (gender) => {
    console.log("Gender selected:", gender);
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", inputs);
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-purple-500">ChatApp</span>
        </h1>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="mb-1 text-gray-300 font-semibold text-sm">
              Full Name
            </label>
            <input
              id="fullName"
              className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-2 shadow-md placeholder:text-sm border-gray-300 rounded-lg w-full"
              type="text"
              placeholder="Full name"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="userName" className="mb-1 text-gray-300 font-semibold text-sm">
              Username
            </label>
            <input
              id="userName"
              className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-2 shadow-md placeholder:text-sm border-gray-300 rounded-lg w-full"
              type="text"
              placeholder="Username"
              value={inputs.userName}
              onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
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
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="confimPassword" className="mb-1 text-gray-300 font-semibold text-sm">
              Confirm Password
            </label>
            <input
              id="confimPassword"
              className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-2 shadow-md placeholder:text-sm border-gray-300 rounded-lg w-full"
              type="password"
              placeholder="Confirm Password"
              value={inputs.confimPassword}
              onChange={(e) => setInputs({ ...inputs, confimPassword: e.target.value })}
              required
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <button 
            className="btn btn-block btn-sm mt-2 border border-slate-700" 
            disabled={loading}
            type="submit"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
          </button>

          <div className="flex flex-col mt-3 items-center text-sm">
            <h3 className="text-gray-300 font-semibold">
              Already have an account?
              <Link to="/login" className="text-blue-400 ml-1 hover:underline">
                Login
              </Link>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;