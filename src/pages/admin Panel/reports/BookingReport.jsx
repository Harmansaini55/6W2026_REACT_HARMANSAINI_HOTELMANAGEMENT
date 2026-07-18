import { useState,useEffect } from "react";
import BookingService from "../../../services/BookingService";

export default function BookingReport() {

 const [bookingList, setBookingList] = useState([]);


useEffect(() => {

  loadBookings();

}, []);



const loadBookings = async () => {

  const data = await BookingService.getAllBookings();

  setBookingList(data);

};

  return (

    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3>Booking Report</h3>
        </div>

        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Mobile</th>
                <th>Room No.</th>
                <th>Room Type</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Guests</th>
                <th>Total Amount</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {
                bookingList.length > 0 ? (

                  bookingList.map((booking) => (

                    <tr key={booking.id}>

                      <td>{booking.id}</td>
                      <td>{booking.customerName}</td>
                      <td>{booking.mobile}</td>
                      <td>{booking.roomNumber}</td>
                      <td>{booking.roomType}</td>

                      <td>
                        {booking.checkInDate}
                        <br />
                        <small>{booking.checkInTime}</small>
                      </td>

                      <td>
                        {booking.checkOutDate}
                        <br />
                        <small>{booking.checkOutTime}</small>
                      </td>

                      <td>{booking.guests}</td>

                      <td>₹ {booking.totalAmount}</td>

                      <td>
                        <span
                          className={
                            booking.paymentStatus === "Paid"
                              ? "badge bg-success"
                              : "badge bg-warning"
                          }
                        >
                          {booking.paymentStatus}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            booking.status === "Booked"
                              ? "badge bg-primary"
                              : "badge bg-secondary"
                          }
                        >
                          {booking.status}
                        </span>
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="11" className="text-center">
                      No Booking Records Found
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