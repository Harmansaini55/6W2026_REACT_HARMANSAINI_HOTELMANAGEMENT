import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {

    let error = {};

    // Full Name
    if (!formData.fullName.trim()) {
      error.fullName = "Full Name is required";
    }

    // Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

if (!formData.email.trim()) {
  error.email = "Email is required";
} else if (!emailPattern.test(formData.email)) {
  error.email = "Please enter a valid Gmail address";
}

    // Mobile Number
    if (!formData.mobile.trim()) {
      error.mobile = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      error.mobile = "Mobile Number must be exactly 10 digits";
    }

    // Password
    if (!formData.password) {
      error.password = "Password is required";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      error.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      error.confirmPassword = "Passwords do not match";
    }

    return error;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {

 setErrors({});


 try {


 const user = await UserService.registerUser({
   email: formData.email,
   password: formData.password
 });



 localStorage.setItem(
   "userRole",
   2
 );


 localStorage.setItem(
   "currentUser",
   JSON.stringify({
     uid:user.uid,
     name:formData.fullName,
     email:formData.email,
     mobile:formData.mobile
   })
 );



 toast.success("Registration Successful. Please Login.");


 navigate("/");


 } catch(error){

   toast.error(error.message);

 }


}
  };
    return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-success text-white text-center">
              <h3>Customer Registration</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    placeholder="Enter Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />

                  {errors.fullName && (
                    <small className="text-danger">
                      {errors.fullName}
                    </small>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <small className="text-danger">
                      {errors.email}
                    </small>
                  )}
                </div>

                {/* Mobile */}
                <div className="mb-3">
                  <label className="form-label">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    maxLength={10}
                    placeholder="Enter Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                  />

                  {errors.mobile && (
                    <small className="text-danger">
                      {errors.mobile}
                    </small>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  {errors.password && (
                    <small className="text-danger">
                      {errors.password}
                    </small>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />

                  {errors.confirmPassword && (
                    <small className="text-danger">
                      {errors.confirmPassword}
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Register
                </button>

              </form>

              <div className="text-center mt-4">
                Already have an account?

                <Link
                  to="/"
                  className="ms-2 text-decoration-none fw-bold"
                >
                  Login
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}