import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminService from "../../../services/AdminService";
import { useEffect } from "react";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  useEffect(() => {

  const checkAdmin = async () => {

    const admin = await AdminService.getData();

    if (admin) {

      navigate("/admin", { replace: true });

    }

  };

  checkAdmin();

}, []);

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  };


  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const admin = await AdminService.login(data);

      if (admin.userType === 1) {

        navigate("/admin", { replace: true });

      }

    }
    catch(error) {

      alert(error.message);

    }

  };


  return (

    <div className="container vh-100 d-flex justify-content-center align-items-center">

      <div className="col-md-5">

        <div className="card shadow-lg border-0 rounded-4">

          <div className="card-body p-5">


            <h2 className="text-center mb-4">
              Admin Login
            </h2>


            <form onSubmit={handleLogin}>


              <div className="mb-3">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Admin Email"
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



              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>


            </form>


          </div>

        </div>

      </div>

    </div>

  );

}