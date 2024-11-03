import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, userName, password, confimPassword, gender }) => {
		const success = handleInputErrors({ fullName, userName, password, confimPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			// Match the exact field names expected by backend
			const requestData = {
				fullName,
				userName,     // Changed from username to userName
				password,
				confimPassword,  // Changed from confirmPassword to confimPassword
				gender
			};

			console.log("Sending signup request with data:", requestData);

			const res = await fetch("/api/auth/signUp", {
				method: "POST",
				headers: { 
					"Content-Type": "application/json",
				},
				credentials: 'include',
				body: JSON.stringify(requestData)
			});

			const data = await res.json();
			
			console.log("Response status:", res.status);
			console.log("Response headers:", Object.fromEntries(res.headers.entries()));
			console.log("Response data:", data);

			if (!res.ok) {
				throw new Error(data.error || `HTTP error! status: ${res.status}`);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
			toast.success("Signup successful!");

		} catch (error) {
			console.error("Signup error details:", {
				message: error.message,
				stack: error.stack
			});
			toast.error(error.message || "Signup failed");
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

const handleInputErrors = ({ fullName, userName, password, confimPassword, gender }) => {
	if (!fullName || !userName || !password || !confimPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password.trim() !== confimPassword.trim()) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
};

export default useSignup;