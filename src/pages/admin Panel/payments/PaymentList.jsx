import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentService from "../../../services/PaymentService";

export default function PaymentList() {

  const [payments, setPayments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadPayments();
  }, []);

const loadPayments = async () => {

  const data = await PaymentService.getAllPayments();

  setPayments(data);

};

 const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this payment?"
  );


  if(confirmDelete){

    await PaymentService.deletePayment(id);

    loadPayments();

    alert("Payment Deleted Successfully");

  }

};

  return (

    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h3>Payment List</h3>

      </div>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>ID</th>

           

            <th>Customer Name</th>

            <th>Room No.</th>

            <th>Amount</th>

            <th>Method</th>

            <th>Status</th>

            <th>Date</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {payments.length > 0 ? (

            payments.map((payment, index) => (

              <tr key={payment.id}>

                <td>{index + 1}</td>

               

                <td>{payment.customerName}</td>

                <td>{payment.roomNumber}</td>

                <td>₹ {payment.amount}</td>

                <td>{payment.paymentMethod}</td>

                <td>

                  <span
                    className={
                      payment.paymentStatus === "Paid"
                        ? "badge bg-success"
                        : payment.paymentStatus === "Pending"
                        ? "badge bg-warning text-dark"
                        : "badge bg-danger"
                    }
                  >
                    {payment.paymentStatus}
                  </span>

                </td>

                <td>{payment.paymentDate}</td>

                <td>

                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() =>
                      navigate(`/admin/payment-details/${payment.id}`)
                    }
                  >
                    View
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(payment.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="9" className="text-center">
                No Payment Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}