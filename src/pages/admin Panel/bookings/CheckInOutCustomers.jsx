import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BookingService from "../../../services/BookingService";
import PaymentService from "../../../services/PaymentService";


export default function CheckInOutCustomer() {


    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);

    const [activeTab, setActiveTab] = useState("checkin");


    const [bookingData, setBookingData] = useState({

        bookingId: "",

        customerName: "",
        mobile: "",

        roomNumber: "",
        roomType: "",

        checkInDate: "",
        checkInTime: "",

        checkOutDate: "",
        checkOutTime: "",

        guests: "1",

        totalAmount: "",

        paymentMethod: "Cash",

        paymentStatus: "Pending"

    });



    useEffect(() => {

        loadBookings();

    }, []);



    const loadBookings = async () => {

        try {

            const data = await BookingService.getAllBookings();

            console.log("Bookings:", data);

            setBookings(data);


        }
        catch (error) {

            console.log(error);

        }

    };




    const selectCustomer = (booking) => {


        setBookingData({

            bookingId: booking.id,

            customerName: booking.customerName,

            mobile: booking.mobile,

            roomNumber: booking.roomNumber,

            roomType: booking.roomType,


            checkInDate: booking.checkInDate || "",

            checkOutDate: booking.checkOutDate || "",


            guests: booking.guests || booking.adults || "1",

            totalAmount: booking.price || booking.totalAmount || "",


            paymentMethod: "Cash",

            paymentStatus: "Paid"


        });


    };






    const handleCheckIn = async () => {


        try {


            if (!bookingData.bookingId) {

                alert("Select Customer First");

                return;

            }



            await BookingService.updateStatus(

                bookingData.bookingId,

                "Checked In"

            );



            const payment = {


                paymentId: "PAY" + Date.now(),

                bookingId: bookingData.bookingId,


                customerName: bookingData.customerName,

                mobile: bookingData.mobile,


                roomNumber: bookingData.roomNumber,

                roomType: bookingData.roomType,


                amount: bookingData.totalAmount,


                paymentMethod: bookingData.paymentMethod,


                paymentStatus: bookingData.paymentStatus,


                paymentDate: new Date().toLocaleDateString(),

               transactionId: "TXN" + Date.now(),

                remarks: "Check In Payment"


            };
            
            


            await PaymentService.addPayment(payment);



            alert("Customer Check-In Successfully");


            loadBookings();


            setBookingData({});


        }
        catch (error) {

            console.log(error);

            alert(error.message);

        }


    };







    const handleCheckOut = async (booking) => {


        try {


            await BookingService.updateStatus(

                booking.id,

                "Checked Out"

            );



            alert("Customer Check-Out Successfully");

            loadBookings();


        }
        catch (error) {

            console.log(error);

        }


    };





    const filteredBookings = bookings.filter((item) => {


        if (activeTab === "checkin") {

            return item.status === "Booked";

        }
        else {

            return item.status === "Checked In";

        }


    });






    return (


        <div className="container py-4">


            <div className="card shadow">


                <div className="card-header bg-success text-white">


                    <h3>
                        Check In / Check Out Customer
                    </h3>


                </div>



                <div className="card-body">



                    <div className="mb-4">


                        <button

                            className={`btn me-2 ${activeTab === "checkin"
                                    ? "btn-success"
                                    : "btn-outline-success"
                                }`}

                            onClick={() => setActiveTab("checkin")}

                        >

                            Check-In Customer

                        </button>



                        <button

                            className={`btn ${activeTab === "checkout"
                                    ? "btn-danger"
                                    : "btn-outline-danger"
                                }`}

                            onClick={() => setActiveTab("checkout")}

                        >

                            Check-Out Customer

                        </button>


                    </div>





                    <table className="table table-bordered">


                        <thead>


                            <tr>

                                <th>Customer</th>

                                <th>Mobile</th>

                                <th>Room</th>

                                <th>Room Type</th>

                                <th>Status</th>

                                <th>Action</th>


                            </tr>


                        </thead>



                        <tbody>


                            {

                                filteredBookings.map((booking) => (


                                    <tr key={booking.id}>


                                        <td>{booking.customerName}</td>


                                        <td>{booking.mobile}</td>


                                        <td>{booking.roomNumber}</td>


                                        <td>{booking.roomType}</td>


                                        <td>{booking.status}</td>



                                        <td>


                                            {

                                                activeTab === "checkin" ?


                                                    <button

                                                        className="btn btn-success"

                                                        onClick={() => {

                                                            selectCustomer(booking);

                                                            handleCheckIn();

                                                        }}

                                                    >

                                                        Check-In

                                                    </button>


                                                    :

                                                    <button

                                                        className="btn btn-danger"

                                                        onClick={() => handleCheckOut(booking)}

                                                    >

                                                        Check-Out

                                                    </button>


                                            }


                                        </td>


                                    </tr>


                                ))


                            }


                        </tbody>



                    </table>





                </div>


            </div>


        </div>


    );


}