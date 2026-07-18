import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingService from "../../../services/BookingService";
import PaymentService from "../../../services/PaymentService";
import CustomerService from "../../../services/CustomerService";

export default function CheckInCustomer() {

    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);

    const [bookingData, setBookingData] = useState({

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

        paymentStatus: "Pending",

        status: "Checked In"

    });
    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        const data = await CustomerService.getAllCustomers();
        setCustomers(data);
    };
const handleCustomerChange = (e) => {

    const selectedCustomer = customers.find(
        (customer) => customer.fullName === e.target.value
    );

    if (selectedCustomer) {

        setBookingData({
            ...bookingData,
            customerName: selectedCustomer.fullName,
            mobile: selectedCustomer.mobile,
            roomNumber: selectedCustomer.roomNumber
        });

    } else {

        setBookingData({
            ...bookingData,
            customerName: "",
            mobile: "",
            roomNumber: ""
        });

    }

};


    const handleChange = (e) => {

        const { name, value } = e.target;

        setBookingData({

            ...bookingData,

            [name]: value

        });

    };



    const handleSave = async (e) => {

        e.preventDefault();

        try {

            const newBooking = {

                ...bookingData,

                id: Date.now().toString(),

                createdAt: new Date().toLocaleString()

            };

            await BookingService.addBooking(newBooking);

            const newPayment = {

                id: (Date.now() + 1).toString(),

                paymentId: "PAY" + Date.now(),

                bookingId: newBooking.id,

                customerName: bookingData.customerName,

                mobile: bookingData.mobile,

                roomNumber: bookingData.roomNumber,

                roomType: bookingData.roomType,

                amount: bookingData.totalAmount,

                paymentMethod: bookingData.paymentMethod,

                paymentStatus: bookingData.paymentStatus,

                paymentDate: new Date().toLocaleDateString(),

                transactionId: "TXN" + Date.now(),

                remarks: "Room Booking Payment"

            };

            await PaymentService.addPayment(newPayment);

            alert("Customer Check-In Successfully");

            navigate("/admin/booking-list");

        }
        catch (error) {

            alert(error.message);

        }

    };


    const handleReset = () => {

        setBookingData({

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
            paymentStatus: "Pending",
            status: "Checked In"

        });

    };



    return (

        <div className="container py-4">


            <div className="card shadow">


                <div className="card-header bg-success text-white">

                    <h3>
                        Check-In Customer
                    </h3>

                </div>



                <div className="card-body">


                    <form onSubmit={handleSave}>


                        <div className="row">


                            <div className="col-md-6 mb-3">

                                <label>Customer Name</label>

                                <select
                                    className="form-select"
                                    value={bookingData.fullName}
                                    onChange={handleCustomerChange}
                                      name="customerName"
                                >
                                    <option value="" disabled hidden>Select Customer</option>

                                    {customers.map((customer) => (
                                        <option key={customer.id} value={customer.fullName}>
                                            {customer.fullName}
                                        </option>
                                    ))}
                                </select>

                            </div>



                            <div className="col-md-6 mb-3">

                                <label>Mobile Number</label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="mobile"

                                    value={bookingData.mobile}

                                   readOnly

                                />

                            </div>



                            <div className="col-md-6 mb-3">

                                <label>Room Number</label>

                                <input

                                    type="text"

                                    className="form-control"

                                    name="roomNumber"

                                    value={bookingData.roomNumber}

                                    readOnly

                                />

                            </div>



                            <div className="col-md-6 mb-3">

                                <label>Room Type</label>

                                <select

                                    className="form-select"

                                    name="roomType"
                                    
                                    value={bookingData.roomType}

                                    onChange={handleChange}

                                >
                                  
                                    <option>Select Room Type</option>
                                    <option>Single Room</option>

                                    <option>Double Room</option>

                                    <option>Family Room</option>

                                    <option>Suite Room</option>

                                </select>

                            </div>



                            <div className="col-md-6 mb-3">

                                <label>Check-In Date</label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="checkInDate"

                                    value={bookingData.checkInDate}

                                    onChange={handleChange}

                                />

                            </div>



                            <div className="col-md-6 mb-3">

                                <label>Check-In Time</label>

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
                                    Number of Guests
                                </label>

                                <input

                                    type="number"

                                    className="form-control"

                                    name="guests"

                                    min="1"

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

                                    placeholder="Enter Amount"

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



                        <div className="mt-4">


                            <button

                                type="submit"

                                className="btn btn-success me-2"

                            >

                                Check-In Customer

                            </button>




                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={handleReset}

                            >

                                Reset

                            </button>


                        </div>



                    </form>


                </div>


            </div>


        </div>


    );


}