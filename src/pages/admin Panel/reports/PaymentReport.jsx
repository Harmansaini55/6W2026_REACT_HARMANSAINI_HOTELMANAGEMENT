import { useState,useEffect } from "react";
import PaymentService from "../../../services/PaymentService";

export default function PaymentReport() {

 const [paymentList, setPaymentList] = useState([]);


useEffect(() => {

  loadPayments();

}, []);



const loadPayments = async () => {

  const data = await PaymentService.getAllPayments();

  setPaymentList(data);

};

  return (

    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3>Payment Report</h3>
        </div>

        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th> ID</th>
               
                <th>Customer Name</th>
                <th>Mobile</th>
                <th>Room No.</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Payment Date</th>
              </tr>

            </thead>

            <tbody>

              {

                paymentList.length > 0 ? (

                  paymentList.map((payment,index) => (

                    <tr key={payment.id}>

                      <td>{index + 1}</td>
                      <td>{payment.customerName}</td>
                      <td>{payment.mobile}</td>
                      <td>{payment.roomNumber}</td>
                      <td>₹ {payment.amount}</td>
                      <td>{payment.paymentMethod}</td>

                      <td>
                        <span
                          className={
                            payment.paymentStatus === "Paid"
                              ? "badge bg-success"
                              : "badge bg-warning"
                          }
                        >
                          {payment.paymentStatus}
                        </span>
                      </td>

                      <td>{payment.paymentDate}</td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="9" className="text-center">
                      No Payment Records Found
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