import { useEffect, useState } from "react";
import BookingService from "../../../services/BookingService";

export default function BookingHistory() {

  const [bookings, setBookings] = useState([]);


  useEffect(() => {

    const fetchBookings = async () => {

      const data = await BookingService.getAllBookings();

      setBookings(data);

    };

    fetchBookings();

  }, []);


  return (

    <div className="container py-5">


      <div className="text-center mb-5">

        <h2 className="fw-bold">
          Booking History
        </h2>

        <p className="text-muted">
          View all your previous room bookings
        </p>

      </div>



      {
        bookings.length > 0 ? (

          <div className="table-responsive">

            <table className="table table-bordered table-hover text-center">


              <thead className="table-dark">

                <tr>

                  <th>S.No</th>
                  <th>Booking Date</th>
                  <th>Room No</th>
                  <th>Room Type</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Price</th>
                  <th>Status</th>

                </tr>

              </thead>



              <tbody>


                {
                  bookings.map((booking, index) => (

                    <tr key={booking.bookingId}>


                      <td>
                        {index + 1}
                      </td>


                      <td>
                        {booking.createdAt
                          ? new Date(booking.createdAt).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        {booking.roomNumber}
                      </td>


                      <td>
                        {booking.roomType}
                      </td>


                      <td>
                        {booking.checkIn}
                      </td>


                      <td>
                        {booking.checkOut}
                      </td>


                      <td>
                        ₹{booking.price}
                      </td>


                      <td>

                        <span
                          className={`badge ${booking.status === "Cancelled"
                              ? "bg-danger"
                              : "bg-success"
                            }`}
                        >

                          {booking.status}

                        </span>

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
              No Booking History Found
            </h4>

          </div>


        )

      }


    </div>

  );

}