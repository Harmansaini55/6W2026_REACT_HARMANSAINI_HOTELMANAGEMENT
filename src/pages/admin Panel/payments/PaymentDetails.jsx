import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaymentService from "../../../services/PaymentService";

export default function PaymentDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);

  useEffect(() => {

  loadPayment();

}, [id]);


const loadPayment = async () => {

  const data = await PaymentService.getPaymentById(id);

  setPayment(data);

};



  if (!payment) {

    return (

      <div className="container mt-5">

        <h3 className="text-danger text-center">
          Payment Not Found
        </h3>

      </div>

    );

  }



  return (

    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3 className="mb-0">
            Payment Details
          </h3>

        </div>


        <div className="card-body">

          <div className="row">

            <div className="col-md-6 mb-3">
              <strong>Payment ID :</strong>
              <p>{payment.paymentId}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Booking ID :</strong>
              <p>{payment.bookingId}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Customer Name :</strong>
              <p>{payment.customerName}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Mobile Number :</strong>
              <p>{payment.mobile}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Room Number :</strong>
              <p>{payment.roomNumber}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Room Type :</strong>
              <p>{payment.roomType}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Total Amount :</strong>
              <p>₹ {payment.amount}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Payment Method :</strong>
              <p>{payment.paymentMethod}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Payment Status :</strong>
              <p>{payment.paymentStatus}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Payment Date :</strong>
              <p>{payment.paymentDate}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Transaction ID :</strong>
              <p>{payment.transactionId}</p>
            </div>

            <div className="col-md-12 mb-3">
              <strong>Remarks :</strong>
              <p>{payment.remarks}</p>
            </div>

          </div>


          <button
            className="btn btn-secondary"
            onClick={() => navigate("/admin/payments")}
          >
            Back
          </button>

        </div>

      </div>

    </div>

  );

}