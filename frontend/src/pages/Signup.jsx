import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 import "../styles/style.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    let formIsValid = true;

    // **Individual field validation**
    const fieldErrors = {}; // To store individual errors

    if (!name) {
      fieldErrors.name = "Name is required.";
      formIsValid = false;
    }

    // checks for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      fieldErrors.email = "Email is required.";
      formIsValid = false;
    } else if (!emailRegex.test(email)) {
      fieldErrors.email = "Please enter a valid email address.";
      formIsValid = false;
    }

    // Validate password
    if (!password) {
      fieldErrors.password = "Password is required.";
      formIsValid = false;
    } else if (password.length < 6) {
      fieldErrors.password = "Password must be at least 6 characters long.";
      formIsValid = false;
    } else if (!/[A-Z]/.test(password)) {
      fieldErrors.password =
        "Password must contain at least one uppercase letter.";
      formIsValid = false;
    } else if (!/[0-9]/.test(password)) {
      fieldErrors.password = "Password must contain at least one number.";
      formIsValid = false;
    }

    // If any field is invalid, set the errors and stop the form submission
    if (!formIsValid) {
      setError(fieldErrors);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();
      navigate("/login");

      if (!response.ok) {
        setError(data.error || "Signup failed. Please try again.");
        console.error(data.error);
        return;
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    }

    // console.log(email, password);
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className="input-box">
          {error.name && <p className="error-message">{error.name}</p>}
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter your name"
          />
        </div>

        <div className="input-box">
          {error.email && <p className="error-message">{error.email}</p>}
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-box">
          {error.password && <p className="error-message">{error.password}</p>}
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
          />

          {/* Password strength guide */}
          <div className="password-requirements">
            <p>Password must:</p>
            <ul>
              <li className={password.length >= 6 ? "valid" : ""}>
                Be at least 6 characters
              </li>
              <li className={/[A-Z]/.test(password) ? "valid" : ""}>
                Contain at least one uppercase letter
              </li>
              <li className={/[0-9]/.test(password) ? "valid" : ""}>
                Contain at least one number
              </li>
            </ul>
          </div>
        </div>

        <button className="auth-btn">Sign up</button>
        <div>
          <h3>
            Already have an account? <Link to="/login">Login now</Link>
          </h3>
        </div>
      </form>
    </div>
  );
};

export default Signup;
