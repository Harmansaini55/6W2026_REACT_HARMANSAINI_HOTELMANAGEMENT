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

          <table className="table table-bordered">

            <tbody>

              <tr>
                <th width="30%">Full Name</th>
                <td>{customer.fullName}</td>
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
                <th>Date of Birth</th>
                <td>{customer.dob}</td>
              </tr>

              <tr>
                <th>City</th>
                <td>{customer.city}</td>
              </tr>

              <tr>
                <th>Address</th>
                <td>{customer.address}</td>
              </tr>

              <tr>
                <th>ID Proof</th>
                <td>{customer.idProof}</td>
              </tr>

              <tr>
                <th>ID Proof Number</th>
                <td>{customer.idNumber}</td>
              </tr>

              <tr>
                <th>Status</th>
                <td>
                  <span
                    className={
                      customer.status === "Active"
                        ? "badge bg-success"
                        : "badge bg-danger"
                    }
                  >
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