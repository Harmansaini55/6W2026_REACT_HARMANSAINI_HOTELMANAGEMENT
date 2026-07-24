import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerService from "../../../services/CustomerService";

export default function CustomerList() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {

    loadCustomers();

  }, []);

  const loadCustomers = async () => {

    try {

      setLoading(true);

      const data = await CustomerService.getAllCustomers();

      setCustomers(data);

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {

      await CustomerService.deleteCustomer(id);

      alert("Customer Deleted Successfully");

      loadCustomers();

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h3 className="fw-bold">
          👤 Customer List
        </h3>


      </div>

      <div className="card shadow">

        <div className="card-body">
          {
            loading ? (

              <div className="text-center py-5">
                <h5>Loading Customers...</h5>
              </div>

            ) : (
              <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">

                  <tr>

                    <th>ID</th>
                    <th>Image</th>
                    <th>Customer Name</th>
                    <th>Room Number</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    customers.length > 0 ?

                      customers.map((customer, index) => (

                        <tr key={customer.id}>

                          <td>{index + 1}</td>

                          <td>

                            <img
                              src={customer.image}
                              alt="Customer"
                              width="70"
                              height="70"
                              className="rounded"
                            />

                          </td>

                          <td>{customer.name}</td>

                          <td>{customer.roomNumber}</td>


                          <td>{customer.email}</td>

                          <td>{customer.mobile}</td>

                          <td>{customer.gender}</td>

                          <td>{customer.city}</td>
                      

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

                          <td>

                            <button
                              className="btn btn-info btn-sm me-2"
                              onClick={() =>
                                navigate(`/admin/customer-details/${customer.id}`)
                              }
                            >
                              View
                            </button>

                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() =>
                                navigate(`/admin/edit-customer/${customer.id}`)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDelete(customer.id)
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))

                      :

                      <tr>

                        <td
                          colSpan="10"
                          className="text-center text-danger fw-bold"
                        >
                          No Customer Found
                        </td>

                        

                      </tr>

                  }

                </tbody>

              </table>
            )
          }
        </div>

      </div>

    </div>

  );

}