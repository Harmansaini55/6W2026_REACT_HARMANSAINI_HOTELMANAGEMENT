import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

export default function Register() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        // All fields required
        if (
            !data.name.trim() ||
            !data.email.trim() ||
            !data.mobile.trim() ||
            !data.password.trim() ||
            !data.confirmPassword.trim()
        ) {

            alert("All fields are required.");
            return;

        }

        // Gmail Validation
        const gmailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;

        if (!gmailPattern.test(data.email.trim().toLowerCase())) {

            alert("Please enter a valid Gmail address.");
            return;

        }

        // Mobile Validation
        if (!/^[0-9]{10}$/.test(data.mobile)) {

            alert("Please enter a valid 10-digit mobile number.");
            return;

        }

        // Password Match
        if (data.password !== data.confirmPassword) {

            alert("Password and Confirm Password do not match.");
            return;

        }

        try {

            await UserService.register(data);

            alert("Registration Successful!");

            navigate("/");

        }
        catch (error) {

            if (error.code === "auth/email-already-in-use") {

                alert("This email is already registered.");

            }
            else if (error.code === "auth/invalid-email") {

                alert("Invalid email address.");

            }
            else if (error.code === "auth/weak-password") {

                alert("Password should be at least 6 characters.");

            }
            else {

                alert(error.message);

            }

        }

    };

    return (

        <div className="container vh-100 d-flex justify-content-center align-items-center">

            <div className="col-md-5">

                <div className="card shadow-lg border-0 rounded-4">

                    <div className="card-body p-5">

                        <h2 className="text-center mb-4">
                            Customer Register
                        </h2>

                        <form onSubmit={handleRegister}>

                            <div className="mb-3">

                                <label>Full Name</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Full Name"
                                    value={data.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={data.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Mobile Number</label>

                                <input
                                    type="tel"
                                    className="form-control"
                                    name="mobile"
                                    placeholder="Enter Mobile Number"
                                    value={data.mobile}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            mobile: e.target.value.replace(/\D/g, "")
                                        })
                                    }
                                    maxLength={10}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={data.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Confirm Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn btn-success w-100"
                            >
                                Register
                            </button>

                        </form>

                        <p className="text-center mt-3">

                            Already have an account?{" "}

                            <Link to="/">
                                Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}