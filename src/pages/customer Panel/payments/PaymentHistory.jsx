import { useEffect, useState } from "react";
import PaymentService from "../../../services/PaymentService";

export default function PaymentHistory() {

  const [payments, setPayments] = useState([]);


 useEffect(() => {

  const fetchPayments = async () => {

    const data = await PaymentService.getAllPayments();

    setPayments(data);

  };

  fetchPayments();

}, []);


  return (

    <div className="container py-5">


      <div className="text-center mb-5">

        <h2 className="fw-bold">
          Payment History
        </h2>

        <p className="text-muted">
          View your complete payment records
        </p>

      </div>



      {
        payments.length > 0 ? (

          <div className="table-responsive">

            <table className="table table-bordered table-hover text-center">


              <thead className="table-dark">

                <tr>

                  <th>S.No</th>
                   <th>CustomerName</th>
                  <th>Payment ID</th>
                  <th>Booking ID</th>
                  <th>Room No</th>
                  <th>Room Type</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Date</th>
                 

                </tr>

              </thead>


              <tbody>


                {
                  payments.map((payment, index) => (

                    <tr key={payment.paymentId}>


                      <td>
                        {index + 1}
                     
                      </td>
                           
                            <td>

                          {payment.customerName}

                        

                      </td>


                      <td>
                        {payment.paymentId}
                      </td>


                      <td>
                        {payment.bookingId}
                      </td>


                      <td>
                        {payment.roomNumber}
                      </td>


                      <td>
                        {payment.roomType}
                      </td>


                      <td>
                        ₹{payment.amount}
                      </td>


                      <td>
                        {payment.paymentMethod}
                      </td>


                      <td>
                        {payment.paymentDate}
                      </td>


                     

                    </tr>

                  ))

                }


              </tbody>


            </table>

          </div>


        ) : (


          <div className="text-center">

            <h4 className="text-danger">
              No Payment History Found
            </h4>

          </div>


        )

      }


    </div>

  );

}