import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookingService from "../../../services/BookingService";
import RoomService from "../../../services/RoomService";
import PaymentService from "../../../services/PaymentService";
import { db } from "../../../firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import CustomerService from "../../../services/CustomerService";
export default function BookRoom() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    useEffect(() => {

        loadRoom();

    }, []);

    const loadRoom = async () => {

        try {

            const data = await RoomService.getRoomById(id);
            console.log(data);
            setRoom(data);

        }
        catch (error) {

            alert(error.message);

        }

    };
    const selectedOffer =
        JSON.parse(localStorage.getItem("selectedOffer"));


    const initialData = {

        customerName: "",
        email: "",
        mobile: "",
        gender: "",
        city: "",
        checkIn: "",
        checkOut: "",
        adults: 0,
        children: 0,
        paymentMethod: "Cash",
        specialRequest: "",

    };

    const [bookingData, setBookingData] =
        useState(initialData);

    const handleChange = (e) => {

        setBookingData({

            ...bookingData,

            [e.target.name]: e.target.value

        });

    };




    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Booking Saved");
        if (
            !bookingData.customerName ||
            !bookingData.email ||
            !bookingData.mobile ||
            !bookingData.checkIn ||
            !bookingData.checkOut
        ) {
            toast.error("Please fill all required details");

            return;
        }

        const existingBookings = await BookingService.getAllBookings();

        const alreadyBooked = existingBookings.find(
            (item) =>
                item.roomId === id &&
                item.status === "Booked"
        );

        if (alreadyBooked) {

            toast.error("This room is already booked.");

            return;

        }
        const newBooking = {

            ...bookingData,


            roomId: id,

            roomNumber: room.roomNumber,

            roomType: room.roomType,

            category: room.category,

            price: room.price,
            status: "Booked",
            bookingId: Date.now().toString(),

            createdAt: new Date().toISOString()
        };
        const newPayment = {

            paymentId: Date.now().toString(),

            bookingId: newBooking.bookingId,

            customerName: bookingData.customerName,

            roomNumber: room.roomNumber,

            roomType: room.roomType,

            amount: room.price,

            paymentMethod: bookingData.paymentMethod,

            paymentDate: new Date().toLocaleDateString(),

            paymentStatus: "Paid"

        };

        await BookingService.addBooking(newBooking);
        console.log("Saving Customer...");
        await CustomerService.addCustomer({
        
            name: bookingData.customerName,

            email: bookingData.email,

            mobile: bookingData.mobile,

            gender: bookingData.gender,

            city: bookingData.city,

            status: "Booked",

            roomNumber: room.roomNumber,

            roomType: room.roomType,

            checkIn: bookingData.checkIn,

            checkOut: bookingData.checkOut,

            adults: bookingData.adults,

            children: bookingData.children,

            paymentMethod: bookingData.paymentMethod,

            specialRequest: bookingData.specialRequest

        });
        console.log("Customer Saved");
        await PaymentService.addPayment(newPayment);

        await RoomService.updateRoom(room.id, {
            ...room,
            status: "Booked"
        });


        toast.success("🎉 Room Booked Successfully");

        setTimeout(() => {
            navigate("/customer/booking-status");
        }, 3000);
    };

    if (!room) {
        return (
            <div className="container py-5 text-center">
                <h3 className="text-danger">Room Not Found</h3>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="card shadow-lg border-0">

                <div className="card-header bg-dark text-white">
                    <h3 className="mb-0">Book Room</h3>
                </div>

                <div className="card-body">

                    <div className="row">

                        {/* Room Details */}

                        <div className="col-md-5">

                            <img
                                src={room.image}
                                alt={room.roomType}
                                className="img-fluid rounded mb-3"
                                style={{
                                    height: "300px",
                                    width: "100%",
                                    objectFit: "cover"
                                }}
                            />

                            <h4>{room.roomType}</h4>

                            <p><b>Room No :</b> {room.roomNumber}</p>

                            <p><b>Category :</b> {room.category}</p>

                            <p><b>Capacity :</b> {room.capacity} Guests</p>

                            <p><b>Price :</b> ₹{room.price} / Night</p>

                        </div>
                        {selectedOffer && (
                            <div className="alert alert-success mt-3">

                                <h5>Applied Offer</h5>

                                <p>
                                    <b>Offer :</b> {selectedOffer.offerName}
                                </p>

                                <p>
                                    <b>Discount :</b> {selectedOffer.discount}
                                </p>

                                <p>
                                    <b>Offer Type :</b> {selectedOffer.offerType}
                                </p>

                                <p>
                                    <b>Valid Till :</b> {selectedOffer.validTo}
                                </p>

                            </div>
                        )}

                        {/* Booking Form */}

                        <div className="col-md-7">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="customerName"
                                        className="form-control"
                                        required
                                        value={bookingData.customerName}
                                        onChange={handleChange}
                                        placeholder="Enter Full Name"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        required
                                        value={bookingData.email}
                                        onChange={handleChange}
                                        placeholder="Enter Email Address"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Mobile Number
                                    </label>

                                    <input
                                        type="tel"
                                        name="mobile"
                                        className="form-control"
                                        required
                                        value={bookingData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter Mobile Number"
                                    />

                                </div>
                                <div className="col-md-6">
                                    <label>Gender</label>

                                    <select
                                        className="form-control"
                                        name="gender"
                                        value={bookingData.gender}
                                        onChange={handleChange}
                                    >

                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>

                                    </select>

                                </div>


                                <div className="col-md-6">

                                    <label>City</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={bookingData.city}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label>Check In</label>

                                        <input
                                            type="date"
                                            name="checkIn"
                                            className="form-control"
                                            required
                                            value={bookingData.checkIn}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Check Out</label>

                                        <input
                                            type="date"
                                            name="checkOut"
                                            className="form-control"
                                            required
                                            value={bookingData.checkOut}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label>Adults</label>

                                        <input
                                            type="number"
                                            name="adults"
                                            min="1"
                                            className="form-control"
                                            value={bookingData.adults}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label>Children</label>

                                        <input
                                            type="number"
                                            name="children"
                                            min="0"
                                            className="form-control"
                                            value={bookingData.children}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                <div className="mb-3">

                                    <label>Payment Method</label>

                                    <select
                                        name="paymentMethod"
                                        className="form-select"
                                        value={bookingData.paymentMethod}
                                        onChange={handleChange}
                                    >

                                        <option value="" disabled hidden>
                                            Select Payment Method
                                        </option>
                                        <option>Cash</option>
                                        <option>UPI</option>
                                        <option>Credit Card</option>
                                        <option>Debit Card</option>
                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label>Special Request</label>

                                    <textarea
                                        rows="3"
                                        name="specialRequest"
                                        className="form-control"
                                        value={bookingData.specialRequest}
                                        onChange={handleChange}
                                        placeholder="Enter Special Request"
                                    >

                                    </textarea>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success me-2"
                                >
                                    Confirm Booking
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setBookingData(initialData)}
                                >
                                    Reset
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}