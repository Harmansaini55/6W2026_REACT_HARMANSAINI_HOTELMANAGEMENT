import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomService from "../../../services/RoomService";
import OfferService from "../../../services/OfferService";

export default function BrowseRoomDetails() {

  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [offers, setOffers] = useState([]);

 useEffect(() => {

  loadRoom();

}, []);

const loadRoom = async () => {

  try {

    const data = await RoomService.getRoomById(id);

    setRoom(data);

    loadOffers(data.roomType);

  } catch (error) {

    alert(error.message);

  }

};

const loadOffers = async (roomType) => {

  const data = await OfferService.getAllOffers();

  setOffers(
    data.filter(
      (item) =>
        item.status === "Active" &&
        item.roomType === roomType
    )
  );

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

              <hr />

              <h5 className="fw-bold">
                Available Offers
              </h5>

              {
                offers.length > 0 ? (

                  offers.map((offer) => (

                    <div key={offer.id} className="border rounded p-3 mb-3">

                      <h6>{offer.offerName}</h6>

                      <p>
                        <b>Discount :</b> {offer.discount}%
                      </p>

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {

                          localStorage.setItem(
                            `selectedOffer_${room.id}`,
                            JSON.stringify(offer)
                          );

                          alert("Offer Applied Successfully");

                        }}
                      >
                        Apply Offer
                      </button>

                    </div>

                  ))

                ) : (

                  <p>No Offers Available</p>

                )
              }
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