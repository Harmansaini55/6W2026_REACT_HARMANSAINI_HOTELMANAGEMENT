import { useEffect, useState } from "react";
import BookingService from "../../../services/BookingService";
import { useParams } from "react-router-dom";

function BookingDetails() {

        const { id } = useParams();
    const [bookings, setBookings] = useState([]);



    useEffect(() => {

        loadBookings();

    }, []);



    const loadBookings = async () => {

        try {

            const data = await BookingService.getAllBookings();
             console.log("Booking Details:", data);

               console.log(data);
               setBooking(data);

            
        }
        catch (error) {

            alert(error.message);

        }

    };




    const handleCheckout = async (id) => {

        const confirmCheckout = window.confirm(
            "Are you sure you want to checkout this customer?"
        );

        if (!confirmCheckout) return;

        try {

            await BookingService.updateStatus(
                id,
                "Checked Out"
            );

            alert("Customer Checkout Successfully");

            loadBookings();

        }
        catch (error) {

            alert(error.message);

        }

    };
     if (!booking) {

    return <h3>Loading...</h3>;

}
    return (

        <div className="container mt-4">

            <h2>Customer Booking Details</h2>

            <div className="card p-4 shadow">


                <h5>Customer Information</h5>

                <p><b>Name:</b> {booking.customerName}</p>

                <p><b>Email:</b> {booking.email}</p>

                <p><b>Mobile:</b> {booking.mobile}</p>

                <p><b>Address:</b> {booking.address}</p>

                <p><b>City:</b> {booking.city}</p>


                <hr />


                <h5>Booking Information</h5>

                <p><b>Check In:</b> {booking.checkIn}</p>

                <p><b>Check Out:</b> {booking.checkOut}</p>

                <p><b>Adults:</b> {booking.adults}</p>

                <p><b>Children:</b> {booking.children}</p>


                <hr />


                <h5>Payment Details</h5>

                <p><b>Payment Method:</b> {booking.paymentMethod}</p>


                <hr />


                <h5>Special Request</h5>

                <p><b>Request:</b> {booking.specialRequest}</p>


            </div>

        </div>

    )

}

export default BookingDetails;