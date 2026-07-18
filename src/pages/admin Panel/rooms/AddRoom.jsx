import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomService from "../../../services/RoomService";

export default function AddRoom() {

    const navigate = useNavigate();


    const initialData = {
        image: "",
        roomNumber: "",
        roomType: "",
        category: "",
        price: "",
        capacity: "",
        status: "Available",
        description: "",
        facilities: "",
       hotelPolicy: "",
    };


    const [roomData, setRoomData] = useState(initialData);



    const handleSave = async (e) => {

        e.preventDefault();


        try {

        await RoomService.addRoom(roomData);

        alert("Room Added Successfully");

        setRoomData(initialData);

        navigate("/admin/room");

    }
    catch (error) {

        alert(error.message);

    }


    };




    const handleReset = () => {

        setRoomData(initialData);

    };




    return (

        <div className="container-fluid py-4">


            <div className="card shadow-lg border-0">


                <div className="card-header bg-dark text-white">

                    <h3 className="mb-0">
                        🏨 Add New Room
                    </h3>

                </div>



                <div className="card-body">


                    <form onSubmit={handleSave}>


                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Room Number
                                </label>


                                <input

                                    type="text"

                                    className="form-control"

                                    placeholder="Enter Room Number"


                                    value={roomData.roomNumber}


                                    onChange={(e) => setRoomData({

                                        ...roomData,

                                        roomNumber: e.target.value

                                    })}

                                />
                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Room Image
                                </label>

                                <input

                                    type="file"

                                    className="form-control"

                                    accept="image/*"
                                    onChange={(e) => {

                                        const file = e.target.files[0];

                                        if (file) {

                                            const reader = new FileReader();

                                            reader.onload = () => {
                                                setRoomData({
                                                    ...roomData,
                                                    image: reader.result
                                                });
                                            };

                                            reader.readAsDataURL(file);
                                        }

                                    }}

                                />

                            </div>

                            <div className="col-md-6 mb-3">


                                <label className="form-label">
                                    Room Type
                                </label>


                                <select
                                    type="text"

                                    className="form-select"
                                    
                                    value={roomData.roomType}


                                    onChange={(e) => setRoomData({

                                        ...roomData,

                                        roomType: e.target.value

                                    })}

                                >

                                    <option value="" disabled hidden>
                                        Select Room Type
                                    </option>

                                    <option>
                                        Single Room
                                    </option>

                                    <option>
                                        Double Room
                                    </option>

                                    <option>
                                        Twin Room
                                    </option>

                                    <option>
                                        Family Room
                                    </option>

                                    <option>
                                        Suite Room
                                    </option>



                                </select>
                            </div>

                            <div className="col-md-6 mb-3">


                                <label className="form-label">
                                    Category
                                </label>


                                <select

                                    className="form-select"


                                    value={roomData.category}


                                    onChange={(e) => setRoomData({

                                        ...roomData,

                                        category: e.target.value

                                    })}

                                >

                                    <option value="" disabled hidden>
                                        Select Category
                                    </option>


                                    <option>
                                        Standard
                                    </option>

                                    <option value="Deluxe">
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


                                <label className="form-label">
                                    Price
                                </label>


                                <input

                                    type="number"

                                    className="form-control"


                                    placeholder="Enter Price"


                                    value={roomData.price}


                                    onChange={(e) => setRoomData({

                                        ...roomData,

                                        price: e.target.value

                                    })}


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
                                    <option value="" disabled hidden>Select Capacity</option>
                                    <option value="1">1 Guest</option>
                                    <option value="2">2 Guests</option>
                                    <option value="3">3 Guests</option>
                                    <option value="4">4 Guests</option>
                                    <option value="5">5 Guests</option>
                                </select>

                            </div>




                            <div className="col-md-6 mb-3">


                                <label className="form-label">
                                    Status
                                </label>


                                <select

                                    className="form-select"


                                    value={roomData.status}


                                    onChange={(e) => setRoomData({

                                        ...roomData,

                                        status: e.target.value

                                    })}

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


                                    onChange={(e) => setRoomData({

                                        ...roomData,

                                        description: e.target.value

                                    })}


                                ></textarea>


                            </div>


                            <div className="col-12 mb-3">
                                <label className="form-label">Facilities</label>

                                <textarea
                                    rows="3"
                                    className="form-control"
                                    placeholder="Enter Facilities"
                                    value={roomData.facilities}
                                    onChange={(e) =>
                                        setRoomData({
                                            ...roomData,
                                            facilities: e.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>

                            <div className="col-12 mb-3">
                                <label className="form-label">Hotel Policy</label>

                                <textarea
                                    rows="3"
                                    className="form-control"
                                    placeholder="Enter Hotel Policy"
                                    value={roomData.hotelPolicy}
                                    onChange={(e) =>
                                        setRoomData({
                                            ...roomData,
                                            hotelPolicy: e.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>

                            
                        </div>





                        <button

                            type="submit"

                            className="btn btn-success me-2 px-4"

                        >

                            Save Room

                        </button>




                        <button

                            type="button"

                            onClick={handleReset}

                            className="btn btn-secondary px-4"

                        >

                            Reset

                        </button>



                    </form>


                </div>


            </div>


        </div>

    );

}