import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomService from "../../../services/RoomService";

export default function BrowseRoomDetails() {

  const { id } = useParams();
  
  const [room, setRoom] = useState(null);
   useEffect(() => {

    loadRoom();

  }, []);

  const loadRoom = async () => {

    try {

      const data = await RoomService.getRoomById(id);

      setRoom(data);

    }
    catch (error) {

      alert(error.message);

    }

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

        <div className="row">

          <div className="col-md-6">

            <img
              src={room.image}
              alt={room.roomType}
              className="img-fluid rounded-start w-100"
              style={{
                height: "500px",
                objectFit: "cover",
              }}
            />

          </div>

          <div className="col-md-6">

            <div className="card-body p-4">

              <h2 className="fw-bold mb-4">
                {room.roomType}
              </h2>

              <p>
                <strong>Room Number :</strong> {room.roomNumber}
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

              <hr />

              <h5 className="fw-bold">
                Description
              </h5>

              <p>
                {room.description}
              </p>

              <hr />

              <h5 className="fw-bold">
                Facilities
              </h5>

              <p>
                {room.facilities}
              </p>

              <hr />

              <h5 className="fw-bold">
                Hotel Policy
              </h5>

              <p>
                {room.hotelPolicy}
              </p>

              <div className="mt-4">

                {
                  room.status === "Available" && (
                    <Link
                      to={`/customer/book-room/${room.id}`}
                      className="btn btn-success me-2"
                    >
                      Book Now
                    </Link>
                  )
                }
                {
                  room.status !== "Available" && (
                    <button
                      className="btn btn-danger me-2"
                      disabled
                    >
                      Room Not Available
                    </button>
                  )
                }
                <Link
                  to="/customer/browse-rooms"
                  className="btn btn-secondary"
                >
                  Back
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}