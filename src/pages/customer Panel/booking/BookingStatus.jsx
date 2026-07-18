import { useEffect, useState } from "react";
import BookingService from "../../../services/BookingService";

export default function BookingStatus() {

  const [bookings, setBookings] = useState([]);


useEffect(() => {

  const fetchBookings = async () => {

    const data = await BookingService.getAllBookings();

    setBookings(data);

  };

  fetchBookings();

}, []);



  const handleCancel = async (bookingId) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );


    if(confirmCancel){

      const updatedBookings = bookings.map((booking) =>
        booking.bookingId === bookingId
          ? {
              ...booking,
              status: "Cancelled"
            }
          : booking
      );


      setBookings(updatedBookings);


     await BookingService.updateStatus(
  booking.id,
  "Cancelled"
);

      alert("Booking Cancelled Successfully");

    }

  };



  return (

    <div className="container py-5">

      <div className="text-center mb-5">

        <h2 className="fw-bold">
          Booking Status
        </h2>

        <p className="text-muted">
          Check your current room booking details
        </p>

      </div>



      {
        bookings.length > 0 ? (

          <div className="row">

            {
              bookings.map((booking) => (

                <div
                  className="col-md-6 mb-4"
                  key={booking.bookingId}
                >

                  <div className="card shadow border-0">

                    <div className="card-header bg-dark text-white">

                      <h5 className="mb-0">
                        Booking ID : {booking.bookingId}
                      </h5>

                    </div>


                    <div className="card-body">


                      <p>
                        <b>Customer Name :</b> {booking.customerName}
                      </p>


                      <p>
                        <b>Email :</b> {booking.email}
                      </p>


                      <p>
                        <b>Mobile :</b> {booking.mobile}
                      </p>


                      <hr/>


                      <p>
                        <b>Room Number :</b> {booking.roomNumber}
                      </p>


                      <p>
                        <b>Room Type :</b> {booking.roomType}
                      </p>


                      <p>
                        <b>Category :</b> {booking.category}
                      </p>


                      <p>
                        <b>Check In :</b> {booking.checkIn}
                      </p>


                      <p>
                        <b>Check Out :</b> {booking.checkOut}
                      </p>


                      <p>
                        <b>Guests :</b> 
                        {booking.adults} Adults,
                        {booking.children} Children
                      </p>


                      <p>
                        <b>Payment Method :</b> {booking.paymentMethod}
                      </p>


                      <p>
                        <b>Price :</b> ₹{booking.price}
                      </p>



                      <p>

                        <b>Status :</b>

                        <span
                          className={`badge ms-2 ${
                            booking.status === "Booked"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >

                          {booking.status}

                        </span>

                      </p>



                      {
                        booking.status !== "Cancelled" && (

                          <button
                            className="btn btn-danger mt-3"
                            onClick={() =>
                              handleCancel(booking.bookingId)
                            }
                          >

                            Cancel Booking

                          </button>

                        )
                      }


                    </div>


                  </div>


                </div>

              ))

            }

          </div>

        ) : (

          <div className="text-center">

            <h4 className="text-danger">
              No Booking Found
            </h4>

          </div>

        )

      }


    </div>

  );

}