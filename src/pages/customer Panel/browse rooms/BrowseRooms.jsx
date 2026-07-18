import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoomService from "../../../services/RoomService";
export default function BrowseRooms() {

  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
      loadRooms();
  }, []);
  
const loadRooms = async () => {

  try {

    const data = await RoomService.getAllRooms();

    setRooms(data);

  }
  catch (error) {

    alert(error.message);

  }

};
  const filteredRooms = rooms.filter((room) =>
    room.status === "Available" &&
    (
      room.roomType.toLowerCase().includes(search.toLowerCase()) ||
      room.category.toLowerCase().includes(search.toLowerCase()) ||
      room.roomNumber.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold">
          Browse Rooms
        </h2>

        <p className="text-muted">
          Choose the perfect room for your comfortable stay.
        </p>
      </div>

      {/* Search */}

      <div className="row justify-content-center mb-4">

        <div className="col-md-6">

          <input
            type="text"
            className="form-control"
            placeholder="Search by Room Number, Type or Category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      <div className="row">

        {filteredRooms.length > 0 ? (

          filteredRooms.map((room) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={room.id}
            >

              <div className="card shadow border-0 h-100">

                <img
                  src={room.image}
                  alt={room.roomType}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body">

                  <h4 className="fw-bold">
                    {room.roomType}
                  </h4>

                  <p>
                    <strong>Room No :</strong> {room.roomNumber}
                  </p>

                  <p>
                    <strong>Category :</strong> {room.category}
                  </p>

                  <p>
                    <strong>Price :</strong> ₹{room.price} / Night
                  </p>

                  <p>
                    <strong>Capacity :</strong> {room.capacity} Guests
                  </p>

                  <p>
                    <strong>Status :</strong>

                    <span
                      className={`badge ms-2 ${room.status === "Available"
                          ? "bg-success"
                          : "bg-danger"
                        }`}
                    >
                      {room.status}
                    </span>

                  </p>

                  <div className="d-flex justify-content-between mt-4">

                    <Link
                      to={`/customer/browse-room-details/${room.id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>

                    {
                      room.status === "Available" && (
                        <Link
                          to={`/customer/book-room/${room.id}`}
                          className="btn btn-success"
                        >
                          Book Now
                        </Link>
                      )
                    }

                  </div>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="col-12 text-center">

            <h4 className="text-danger">
              No Rooms Available
            </h4>

          </div>

        )}

      </div>

    </div>

  );

}
