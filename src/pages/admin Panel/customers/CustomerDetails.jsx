import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerService from "../../../services/CustomerService";

export default function CustomerDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);


  useEffect(() => {

    getCustomer();

  }, []);


  const getCustomer = async () => {

    const data = await CustomerService.getCustomerById(id);

    setCustomer(data);

  };

  if (!customer) {

    return (
      <div className="container mt-5 text-center">
        <h3 className="text-danger">
          Customer Not Found
        </h3>

        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/admin/customer")}
        >
          Back
        </button>
      </div>
    );

  }

  return (

    <div className="container py-4">

      <div className="card shadow-lg border-0">

        <div className="card-header bg-primary text-white">

          <h3 className="mb-0">
            👤 Customer Details
          </h3>

        </div>

        <div className="card-body">

          {customer.image && (
            <div className="text-center mb-4">
              <img
                src={customer.image}
                alt="Customer"
                className="rounded-circle shadow"
                width="180"
                height="180"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <table className="table table-bordered">

            <tbody>

              <tr>
                <th width="30%">Full Name</th>
                <td>{customer.name}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{customer.email}</td>
              </tr>

              <tr>
                <th>Mobile Number</th>
                <td>{customer.mobile}</td>
              </tr>

              <tr>
                <th>Gender</th>
                <td>{customer.gender}</td>
              </tr>

              <tr>
                <th>City</th>
                <td>{customer.city}</td>
              </tr>

              <tr>
                <th>Room Number</th>
                <td>{customer.roomNumber}</td>
              </tr>

              <tr>
                <th>Room Type</th>
                <td>{customer.roomType}</td>
              </tr>

              <tr>
                <th>Check In</th>
                <td>{customer.checkIn}</td>
              </tr>

              <tr>
                <th>Check Out</th>
                <td>{customer.checkOut}</td>
              </tr>

              <tr>
                <th>Adults</th>
                <td>{customer.adults}</td>
              </tr>

              <tr>
                <th>Children</th>
                <td>{customer.children}</td>
              </tr>

              <tr>
                <th>Payment Method</th>
                <td>{customer.paymentMethod}</td>
              </tr>

              <tr>
                <th>Special Request</th>
                <td>{customer.specialRequest}</td>
              </tr>

              <tr>
                <th>Status</th>
                <td>
                  <span className="badge bg-success">
                    {customer.status}
                  </span>
                </td>
              </tr>

            </tbody>
          </table>

          <div className="text-center mt-4">

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/admin/customer-list")}
            >
              ← Back to Customer List
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}