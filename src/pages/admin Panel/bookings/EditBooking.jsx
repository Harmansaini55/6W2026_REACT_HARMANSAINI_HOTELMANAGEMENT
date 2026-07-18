import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingService from "../../../services/BookingService";


export default function EditBooking() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [bookingData, setBookingData] = useState({

        customerName: "",
        mobile: "",

        roomNumber: "",
        roomType: "",

        checkInDate: "",
        checkInTime: "",

        checkOutDate: "",
        checkOutTime: "",

        guests: "",

        totalAmount: "",

        paymentMethod: "Cash",

        paymentStatus: "Pending",

        status: "Booked"

    });



  useEffect(() => {

    loadBooking();

}, [id]);

const loadBooking = async () => {

    try {

        const booking = await BookingService.getBookingById(id);

        if (booking) {

            setBookingData(booking);

        }

    } catch (error) {

        alert(error.message);

    }

};




    const handleChange = (e) => {


        const { name, value } = e.target;


        setBookingData({

            ...bookingData,

            [name]: value

        });


    };

const handleUpdate = async (e) => {

    e.preventDefault();

    try {

        await BookingService.updateBooking({

            ...bookingData,
             id: bookingData.id

        });

        alert("Booking Updated Successfully");

        navigate("/admin/booking-list");

    } catch (error) {

        alert(error.message);

    }

};

if (!bookingData.id) {

    return null;

}


    return (


        <div className="container py-4">


            <div className="card shadow">


                <div className="card-header bg-warning">


                    <h3>
                        Edit Booking
                    </h3>


                </div>



                <div className="card-body">


                    <form onSubmit={handleUpdate}>


                        <div className="row">



                            <div className="col-md-6 mb-3">

                                <label>
                                    Customer Name
                                </label>

                                <input

                                    className="form-control"

                                    name="customerName"

                                    value={bookingData.customerName}

                                    onChange={handleChange}

                                />

                            </div>




                            <div className="col-md-6 mb-3">

                                <label>
                                    Mobile Number
                                </label>

                                <input

                                    className="form-control"

                                    name="mobile"

                                    value={bookingData.mobile}

                                    onChange={handleChange}

                                />

                            </div>




                            <div className="col-md-6 mb-3">

                                <label>
                                    Room Number
                                </label>

                                <input

                                    className="form-control"

                                    name="roomNumber"

                                    value={bookingData.roomNumber}

                                    onChange={handleChange}

                                />

                            </div>




                            <div className="col-md-6 mb-3">

                                <label>
                                    Room Type
                                </label>

                                <select

                                    className="form-select"

                                    name="roomType"

                                    value={bookingData.roomType}

                                    onChange={handleChange}

                                >

                                    <option>Single Room</option>

                                    <option>Double Room</option>

                                    <option>Family Room</option>

                                    <option>Suite Room</option>

                                </select>

                            </div>





                            <div className="col-md-6 mb-3">

                                <label>
                                    Check-In Date
                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="checkInDate"

                                    value={bookingData.checkInDate}

                                    onChange={handleChange}

                                />

                            </div>





                            <div className="col-md-6 mb-3">

                                <label>
                                    Check-In Time
                                </label>

                                <input

                                    type="time"

                                    className="form-control"

                                    name="checkInTime"

                                    value={bookingData.checkInTime}

                                    onChange={handleChange}

                                />

                            </div>




                            <div className="col-md-6 mb-3">

                                <label>
                                    Check-Out Date
                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="checkOutDate"

                                    value={bookingData.checkOutDate}

                                    onChange={handleChange}

                                />

                            </div>





                            <div className="col-md-6 mb-3">

                                <label>
                                    Check-Out Time
                                </label>

                                <input

                                    type="time"

                                    className="form-control"

                                    name="checkOutTime"

                                    value={bookingData.checkOutTime}

                                    onChange={handleChange}

                                />

                            </div>





                            <div className="col-md-6 mb-3">

                                <label>
                                    Guests
                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="guests"

                                    value={bookingData.guests}

                                    onChange={handleChange}

                                />

                            </div>




                            <div className="col-md-6 mb-3">

                                <label>
                                    Total Amount
                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="totalAmount"

                                    value={bookingData.totalAmount}

                                    onChange={handleChange}

                                />

                            </div>





                            <div className="col-md-6 mb-3">

                                <label>
                                    Payment Method
                                </label>

                                <select

                                    className="form-select"

                                    name="paymentMethod"

                                    value={bookingData.paymentMethod}

                                    onChange={handleChange}

                                >

                                    <option>Cash</option>

                                    <option>Card</option>

                                    <option>UPI</option>

                                    <option>Net Banking</option>


                                </select>


                            </div>





                            <div className="col-md-6 mb-3">

                                <label>
                                    Payment Status
                                </label>


                                <select

                                    className="form-select"

                                    name="paymentStatus"

                                    value={bookingData.paymentStatus}

                                    onChange={handleChange}

                                >

                                    <option>Pending</option>

                                    <option>Paid</option>

                                    <option>Partial</option>


                                </select>


                            </div>




                        </div>



                        <button

                            type="submit"

                            className="btn btn-success me-2"

                        >

                            Update Booking

                        </button>




                        <button

                            type="button"

                            className="btn btn-secondary"

                            onClick={() => navigate(-1)}

                        >

                            Cancel

                        </button>




                    </form>


                </div>


            </div>


        </div>


    );


}