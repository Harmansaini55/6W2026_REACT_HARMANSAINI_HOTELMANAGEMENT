import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomService from "../../../services/RoomService";

export default function RoomDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

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
   return null;
}

  return (

    <div className="container py-4">

      <div className="card shadow-lg border-0">

        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">
            🏨 Room Details
          </h2>
        </div>

        <div className="card-body">

          <div className="text-center mb-4">

            <img
              src={room.image}
              alt="Room"
              className="img-fluid rounded shadow"
              style={{
                width: "450px",
                height: "280px",
                objectFit: "cover"
              }}
            />

          </div>


          <table className="table table-bordered">

            <tbody>

              <tr>
                <th width="30%">Room Number</th>
                <td>{room.roomNumber}</td>
              </tr>

              <tr>
                <th>Room Type</th>
                <td>{room.roomType}</td>
              </tr>

              <tr>
                <th>Category</th>
                <td>{room.category}</td>
              </tr>

              <tr>
                <th>Price</th>
                <td>₹ {room.price}</td>
              </tr>

              <tr>
                <th>Capacity</th>
                <td>{room.capacity} Guests</td>
              </tr>

              <tr>
                <th>Status</th>
                <td>{room.status}</td>
              </tr>

              <tr>
                <th>Description</th>
                <td>{room.description}</td>
              </tr>

              <tr>
                <th>Facilities</th>
                <td>
                  {room.facilities || "Not Available"}
                </td>
              </tr>

              

              <tr>
                <th>Hotel Policy</th>
                <td>
                  {room.hotelPolicy || "Not Available"}
                </td>
              </tr>

            </tbody>

          </table>

          <div className="text-center mt-4">

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/admin/room")}
            >
              ← Back to Room List
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}