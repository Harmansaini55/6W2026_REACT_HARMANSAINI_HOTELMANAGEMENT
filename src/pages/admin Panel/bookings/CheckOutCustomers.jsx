import { useEffect, useState } from "react";
import BookingService from "../../../services/BookingService";


export default function CheckOutCustomer() {


    const [bookings, setBookings] = useState([]);



    useEffect(() => {

        loadBookings();

    }, []);



   const loadBookings = async () => {

    const data = await BookingService.getAllBookings();

    const checkedInCustomers = data.filter(
        (booking) => booking.status === "Checked In"
    );

    setBookings(checkedInCustomers);

};




   const handleCheckout = async (id) => {

    const confirmCheckout = window.confirm(
        "Are you sure you want to checkout this customer?"
    );

    if (!confirmCheckout) return;

    await BookingService.updateStatus(
        id,
        "Checked Out"
    );

    alert("Customer Checkout Successfully");

    loadBookings();

};





    return (

        <div className="container py-4">


            <div className="card shadow">


                <div className="card-header bg-danger text-white">

                    <h3>
                        Check-In-Out Customer
                    </h3>

                </div>



                <div className="card-body">



                    <table className="table table-bordered table-hover">


                        <thead className="table-dark">


                            <tr>

                                <th>ID</th>

                                <th>Customer Name</th>

                                <th>Mobile</th>

                                <th>Room Number</th>

                                <th>Room Type</th>

                                <th>Check-In</th>

                                <th>Check-Out</th>

                                <th>Amount</th>

                                <th>Action</th>


                            </tr>


                        </thead>



                        <tbody>


                            {

                                bookings.length > 0 ?


                                    bookings.map((booking, index) => (


                                        <tr key={booking.id}>


                                            <td>
                                                {index + 1}
                                            </td>


                                            <td>
                                                {booking.customerName}
                                            </td>


                                            <td>
                                                {booking.mobile}
                                            </td>


                                            <td>
                                                {booking.roomNumber}
                                            </td>


                                            <td>
                                                {booking.roomType}
                                            </td>


                                            <td>
                                                {booking.checkInDate}
                                            </td>


                                            <td>
                                                {booking.checkOutDate}
                                            </td>


                                            <td>
                                                ₹ {booking.totalAmount}
                                            </td>


                                            <td>


                                                <button

                                                    className="btn btn-danger btn-sm"

                                                    onClick={() => handleCheckout(booking.id)}

                                                >

                                                    Confirm Checkout

                                                </button>


                                            </td>


                                        </tr>


                                    ))


                                    :


                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="text-center"
                                        >

                                            No Customer For Checkout

                                        </td>

                                    </tr>


                            }



                        </tbody>


                    </table>


                </div>


            </div>


        </div>


    );


}