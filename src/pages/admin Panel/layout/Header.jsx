import AdminService from "../../../services/AdminService";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
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

    await AdminService.logout();
    
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

        <Link className="navbar-brand fw-bold" to="/admin/dashboard">
          🏨 Royal Stay Hotel
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
              <Link className="nav-link" to="/admin">
                Dashboard
              </Link>
            </li>

            {/* Rooms */}
            <li className="nav-item">
             
           <Link className="nav-link" to="/admin/room">
                Rooms
              </Link>
             
            </li>

            {/* Customers */}

            <li className="nav-item">

               <Link className="nav-link" to="/admin/customer-list">
                Customers
              </Link>

           

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
                  <Link className="dropdown-item" to="/admin/booking-list">
                    Bookings-List
                  </Link>
                </li>


                <li>
                  <Link className="dropdown-item" to="/admin/checkinout">
                    Check-In-Out Customers
                  </Link>
                </li>

              </ul>

            </li>

            {/* Payments */}

            <li className="nav-item">

               <Link className="nav-link" to="/admin/payments">
                Payments
              </Link>

             

            </li>

            {/* Hotel Services */}

            <li className="nav-item ">

             
               <Link className="nav-link" to="/admin/services">
                Hotel Services
              </Link>


            </li>

            {/* Staff */}

            <li className="nav-item">

             
               <Link className="nav-link" to="/admin/staff-list">
                Staff
              </Link>


         

            </li>

            {/* Offers */}

            <li className="nav-item ">

             
               <Link className="nav-link" to="/admin/offer-list">
                Offers
              </Link>


              

            </li>

            {/* Reports */}

            <li className="nav-item dropdown">

              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Reports
              </a>

              <ul className="dropdown-menu">

                <li>
                  <Link className="dropdown-item" to="/admin/booking-report">
                    Booking Reports
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/admin/payment-report">
                    Payment Reports
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/admin/customer-report">
                    customers Reports
                  </Link>
                </li>

              </ul>

            </li>



            <li><hr className="dropdown-divider" /></li>

            <li>
              <button
                className="dropdown-item text-danger mt-1"
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