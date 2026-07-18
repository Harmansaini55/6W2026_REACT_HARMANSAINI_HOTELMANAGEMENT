import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RoomService from "../../../services/RoomService";

export default function RoomList() {

    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

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


   const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    try {

        await RoomService.deleteRoom(id);

        alert("Room Deleted Successfully");

        loadRooms();

    }
    catch (error) {

        alert(error.message);

    }

};



    return (
        <div className="container-fluid mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">

                <h3 className="mb-3 ">
                    Room List
                </h3>

                <Link
                    to="/admin/add-room"
                    className="btn-dark btn-lg px-4 py-2 shadow"
                >
                    + Add Room
                </Link>
            </div>
            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Image</th>
                        <th>Room Number</th>
                        <th>Room Type</th>
                        <th>Price</th>
                        <th>Capacity</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>


                    {
                        rooms.map((room, index) => (

                            <tr key={room.rommId}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={room.image}
                                        alt="room"
                                        width="70"
                                        height="50"
                                        style={{ objectFit: "cover" }}
                                    />
                                </td>

                                <td>{room.roomNumber}</td>

                                <td>{room.roomType}</td>

                                <td>{room.price}</td>
                                <td>{room.capacity}</td>

                                <td>{room.category}</td>

                                <td>{room.status}</td>


                                <td>

                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => navigate(`/admin/room-details/${room.id}`)}
                                    >
                                        View
                                    </button>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(room.id)}
                                    >
                                        Delete
                                    </button>


                                </td>


                            </tr>

                        ))

                    }


                </tbody>


            </table>


        </div>

    );


}