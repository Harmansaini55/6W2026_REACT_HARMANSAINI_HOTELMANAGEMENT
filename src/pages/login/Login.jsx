import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../../services/UserService";


export default function Login() {

  const navigate = useNavigate();


  const [data, setData] = useState({
    email: "",
    password: "",
  });




  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  };

  const handleLogin = async (e) => {

    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(data.email.trim())) {

      alert("Please enter a valid email address.");

      return;

    }

    try {

      const user = await UserService.login(data);


      if (user.userType === 2) {

        navigate("/customer");

      }
      else {

        alert("Invalid User");

      }

    }

   catch (error) {

  if (error.message === "REGISTER_FIRST") {

    alert("Please Register First.");

    navigate("/register");

  }

  else if (
    error.code === "auth/invalid-credential"
  ) {

    alert("Please Register First.");

    navigate("/register");

  }

  else if (error.code === "auth/wrong-password") {

    alert("Incorrect Password.");

  }

  else if (error.code === "auth/invalid-email") {

    alert("Please enter a valid email address.");

  }

  else if (error.code === "auth/too-many-requests") {

    alert("Too many attempts. Please try again later.");

  }

  else {

    alert("Something went wrong. Please try again.");

  }

}
  }

  const handleForgotPassword = async () => {

    if (!data.email) {

      alert("Please enter your email.");

      return;

    }

    try {

      await UserService.forgotPassword(data.email);

      alert("Password reset email sent successfully.");

    }
    catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="container vh-100 d-flex justify-content-center align-items-center">

      <div className="col-md-5">

        <div className="card shadow-lg border-0 rounded-4">

          <div className="card-body p-5">

            <h2 className="text-center mb-4">
              Login
            </h2>

            <form onSubmit={handleLogin}>

              <div className="mb-3">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-4">

                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="text-end mb-3">

                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>

              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register">
                Register
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}