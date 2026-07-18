import React, { useEffect, useState } from "react";
import BookingService from "../../../services/BookingService";
import { useNavigate } from "react-router-dom";

export default function BookingList() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

 useEffect(() => {

    loadBookings();

}, []);

const loadBookings = async () => {

    try {

        const data = await BookingService.getAllBookings();

        setBookings(data);

    } catch (error) {

        alert(error.message);

    }

};

 const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {

        await BookingService.deleteBooking(id);

        alert("Booking Deleted Successfully");

        loadBookings();

    } catch (error) {

        alert(error.message);

    }

};

  return (
    <div className="container-fluid py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">
          🏨  Bookings-List
        </h2>
<button
  className="btn btn-dark"
  onClick={() => navigate("/admin/checkin")}
>
  + Add Booking
</button>
      </div>

      {/* Card */}
      <div className="card shadow-lg border-0">

        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Booking List</h5>
        </div>

        <div className="card-body">

          {/* Search */}
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search Booking..."
              />
            </div>
          </div>

          {/* Table */}

          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-dark">

                <tr>

                  <th>#</th>

                  <th>Booking ID</th>

                  <th>Customer Name</th>

                  <th>Room</th>

                 

                  <th>Guests</th>

                  <th>Status</th>

                  <th>Total</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {bookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td>{index + 1}</td>
                    <td>BK{booking.id}</td>
                    <td>{booking.customerName}</td>
                    <td>{booking.roomNumber}</td>
                    <td>{booking.guests}</td>
                    <td>{booking.status}</td>
                    <td>₹{booking.totalAmount}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => navigate(`/admin/bookings-details/${booking.id}`)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => navigate(`/admin/edit-booking/${booking.id}`)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(booking.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}