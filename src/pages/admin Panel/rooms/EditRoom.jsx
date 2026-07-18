import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RoomService from "../../../services/RoomService";

export default function EditRoom() {

    const { id } = useParams();

    const navigate = useNavigate();



   const [roomData, setRoomData] = useState(null);

useEffect(() => {

    loadRoom();

}, []);

const loadRoom = async () => {

    const data = await RoomService.getRoomById(id);

    setRoomData(data);

};

  if (!roomData) {

    return (

        <div className="container mt-5">

            <h3 className="text-danger text-center">
                Room Not Found
            </h3>

            <div className="text-center mt-3">

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/admin/room")}
                >
                    Back

                </button>

            </div>

        </div>

    );

}

    const handleUpdate = async (e) => {

        e.preventDefault();



        const confirmUpdate =
            window.confirm(
                "Are you sure you want to update this room?"
            );

             if (!confirmUpdate) return;

    try {

        await RoomService.updateRoom(id, roomData);

        alert("Room Updated Successfully");

        navigate("/admin/room");

    }
    catch (error) {

        alert(error.message);

    }

        };



    return (

        <div className="container-fluid py-4">


            <div className="card shadow">


                <div className="card-header bg-dark text-white">

                    <h3>
                        Edit Room
                    </h3>

                </div>



                <div className="card-body">


                    <form onSubmit={handleUpdate}>


                        <div className="row">



                            <div className="col-md-6 mb-3">

                                <label>
                                    Room Number
                                </label>

                                <input

                                    className="form-control"

                                    value={roomData.roomNumber}

                                    onChange={(e) =>

                                        setRoomData({

                                            ...roomData,

                                            roomNumber: e.target.value

                                        })

                                    }

                                />

                            </div>




                            <div className="col-md-6 mb-3">

                                <label>
                                    Room Type
                                </label>


                                <select

                                    className="form-select"

                                    value={roomData.roomType}

                                    onChange={(e) =>

                                        setRoomData({

                                            ...roomData,

                                            roomType: e.target.value

                                        })

                                    }

                                >


                                    <option>
                                        Single Room
                                    </option>


                                    <option>
                                        Double Room
                                    </option>


                                    <option>
                                        Family Room
                                    </option>


                                    <option>
                                        Suite Room
                                    </option>


                                </select>


                            </div>
                            <div className="mb-3">
                                <label className="form-label">Room Image</label>

                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];

                                        if (file) {
                                            setRoomData({
                                                ...roomData,
                                                image: URL.createObjectURL(file),
                                            });
                                        }
                                    }}
                                />
                            </div>




                            <div className="col-md-6 mb-3">

                                <label>
                                    Category
                                </label>


                                <select

                                    className="form-select"

                                    value={roomData.category}

                                    onChange={(e) =>

                                        setRoomData({

                                            ...roomData,

                                            category: e.target.value

                                        })

                                    }

                                >


                                    <option>
                                        Standard
                                    </option>

                                    <option>
                                        Deluxe
                                    </option>

                                    <option>
                                        Super Deluxe
                                    </option>

                                    <option>
                                        Luxury
                                    </option>

                                    <option>
                                        Premium
                                    </option>


                                </select>


                            </div>






                            <div className="col-md-6 mb-3">

                                <label>
                                    Price
                                </label>


                                <input

                                    type="text"

                                    className="form-control"

                                    value={roomData.price}

                                    onChange={(e) =>

                                        setRoomData({

                                            ...roomData,

                                            price: e.target.value

                                        })

                                    }

                                />


                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Capacity
                                </label>

                                <select
                                    className="form-select"
                                    value={roomData.capacity}
                                    onChange={(e) =>
                                        setRoomData({
                                            ...roomData,
                                            capacity: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select Capacity</option>
                                    <option value="2">2 Guests</option>
                                    <option value="3">3 Guests</option>
                                    <option value="4">4 Guests</option>
                                    <option value="5">5 Guests</option>
                                </select>

                            </div>



                            <div className="col-md-6 mb-3">

                                <label>
                                    Status
                                </label>


                                <select

                                    className="form-select"

                                    value={roomData.status}

                                    onChange={(e) =>

                                        setRoomData({

                                            ...roomData,

                                            status: e.target.value

                                        })

                                    }

                                >

                                    <option>
                                        Available
                                    </option>

                                    <option>
                                        Booked
                                    </option>

                                    <option>
                                        Maintenance
                                    </option>


                                </select>


                            </div>

                            <div className="col-12 mb-3">

                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
                                    placeholder="Enter Room Description"
                                    value={roomData.description}
                                    onChange={(e) =>
                                        setRoomData({
                                            ...roomData,
                                            description: e.target.value,
                                        })
                                    }
                                ></textarea>

                            </div>
                            <div className="col-12 mb-3">

                                <label className="form-label">
                                    Facilities
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Enter Room Facilities"
                                    value={roomData.facilities}
                                    onChange={(e) =>
                                        setRoomData({
                                            ...roomData,
                                            facilities: e.target.value,
                                        })
                                    }
                                />

                            </div>


                            <div className="col-12 mb-3">

                                <label className="form-label">
                                    Hotel Policy
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Enter Hotel Policy"
                                    value={roomData.hotelPolicy}
                                    onChange={(e) =>
                                        setRoomData({
                                            ...roomData,
                                            hotelPolicy: e.target.value,
                                        })
                                    }
                                />

                            </div>

                        </div>



                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Update Room
                        </button>



                    </form>


                </div>


            </div>


        </div>


    )

}