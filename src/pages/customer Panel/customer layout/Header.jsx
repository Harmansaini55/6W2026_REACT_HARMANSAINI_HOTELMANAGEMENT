import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../../../services/UserService";
import AuthService from "../../../services/AuthService";
import DeleteService from "../../../services/DeleteService";

export default function Header() {
  const navigate = useNavigate();
 
 const handleLogout = async () => {

  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

    if (!confirmLogout) return;

  try {

    await DeleteService.deleteAllData();

    await UserService.logout();

    toast.success("Logout Successfully");

    navigate("/", { replace: true });

  }
  catch (error) {

    alert(error.message);

  }


};



  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">

        <Link className="navbar-brand fw-bold" to="/customer">
          🏨 Hotel Booking
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/customer">
                Dashboard
              </Link>
            </li>

            {/* Rooms */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Rooms
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/customer/browse-rooms">
                    Browse Rooms
                  </Link>
                </li>

              </ul>
            </li>



            {/* Bookings */}

            <li className="nav-item dropdown">

              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Bookings
              </a>

              <ul className="dropdown-menu">

                <li>
                  <Link className="dropdown-item" to="/customer/booking-status">
                    Booking Status
                  </Link>
                </li>


                <li>
                  <Link className="dropdown-item" to="/customer/booking-history">
                    Booking History
                  </Link>
                </li>


              </ul>

            </li>

            {/* Payments */}

            <li className="nav-item dropdown">

              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Payments
              </a>

              <ul className="dropdown-menu">

                <li>
                  <Link className="dropdown-item" to="/customer/payment-history">
                    Payment History
                  </Link>
                </li>

              </ul>

            </li>

            {/*  Services */}

            <li className="nav-item dropdown">

              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Services
              </a>

              <ul className="dropdown-menu">

                <li>
                  <Link className="dropdown-item" to="/customer/request-hotel-services">
                    Request Hotel Services
                  </Link>
                </li>

              </ul>

            </li>



            {/* Offers */}

            <li className="nav-item">
              <Link className="nav-link" to="/customer/offers">
                Offers
              </Link>
            </li>

            {/* Feedback */}

            <li className="nav-item">
              <Link className="nav-link" to="/customer/feedback">
                Feedback
              </Link>
            </li>


            <li className="nav-item">
              <button
                className="btn btn-danger ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>



        </div>
      </div>
    </nav>
  );
}