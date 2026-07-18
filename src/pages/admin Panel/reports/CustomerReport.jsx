import { useState,useEffect } from "react";
import CustomerService from "../../../services/CustomerService";

export default function CustomerReport() {

 const [customerList, setCustomerList] = useState([]);


useEffect(() => {

  loadCustomers();

}, []);



const loadCustomers = async () => {

  const data = await CustomerService.getAllCustomers();

  setCustomerList(data);

};

  return (
    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3>Customer Report</h3>
        </div>

        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>City</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {
                customerList.length > 0 ? (

                  customerList.map((customer) => (

                    <tr key={customer.id}>

                      <td>{customer.id}</td>
                      <td>{customer.fullName}</td>
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

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="7" className="text-center">
                      No Customer Records Found
                    </td>
                  </tr>

                )

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );

}