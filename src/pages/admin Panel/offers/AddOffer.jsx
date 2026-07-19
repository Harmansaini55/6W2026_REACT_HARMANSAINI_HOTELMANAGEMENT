import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OfferService from "../../../services/OfferService";
import OfferModel from "../../../models/OfferModel";

export default function AddOffer() {

  const navigate = useNavigate();

  const [offerData, setOfferData] = useState({
    offerName: "",
    offerType: "",
    roomType: "",
    discount: "",
    validFrom: "",
    validTo: "",
    description: "",
    status: "Active",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setOfferData({
      ...offerData,
      [name]: value,
    });

  };

  const handleSave = async (e) => {

    e.preventDefault();


    const newOffer = new OfferModel(
      "",
      offerData.offerName,
      offerData.offerType,
      offerData.discount,
      offerData.roomType,
      offerData.validFrom,
      offerData.validTo,
      offerData.description,
      offerData.status
    );


    await OfferService.addOffer(newOffer);


    alert("Offer Added Successfully");


    navigate("/admin/offer-list");

  };


  const handleReset = () => {

    setOfferData({
      offerName: "",
      offerType: "",
      discount: "",
      validFrom: "",
      validTo: "",
      description: "",
      status: "Active",
      roomType: "",
    });

  };

  return (

    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3> Add Offer</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSave}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Offer Name</label>

                <select
                  className="form-select"
                  name="offerName"
                  value={offerData.offerName}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Select Offer</option>
                  <option>Summer Offer</option>
                  <option>Weekend Special</option>
                  <option>Festival Offer</option>
                  <option>Family Package</option>
                  <option>Honeymoon Package</option>
                  <option>New Year Offer</option>
                </select>

              </div>

              <div className="col-md-6 mb-3">
                <label>Offer Type</label>

                <select
                  className="form-select"
                  name="offerType"
                  value={offerData.offerType}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Select Type</option>
                  <option>Seasonal</option>
                  <option>Weekend</option>
                  <option>Festival</option>
                  <option>Couple</option>
                  <option>Booking</option>
                  <option>Corporate</option>
                  <option>Family</option>
                  <option>Holiday</option>


                </select>

              </div>

              <div className="col-md-6 mb-3">
                <label>Room Type</label>

                <select
                  className="form-select"
                  name="roomType"
                  value={offerData.roomType}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Select Room Type</option>
                  <option>Double Room</option>
                  <option>Single Room</option>
                  <option>Family Room</option>
                  <option>Twin Room</option>
                  <option>Suite Room</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Discount</label>

                <input
                  type="text"
                  className="form-control"
                  name="discount"
                  value={offerData.discount}
                  onChange={handleChange}
                  placeholder="Enter Discount"
                />

              </div>

              <div className="col-md-6 mb-3">
                <label>Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={offerData.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

              </div>

              <div className="col-md-6 mb-3">
                <label>Valid From</label>

                <input
                  type="date"
                  className="form-control"
                  name="validFrom"
                  value={offerData.validFrom}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">
                <label>Valid To</label>

                <input
                  type="date"
                  className="form-control"
                  name="validTo"
                  value={offerData.validTo}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-12 mb-3">
                <label>Description</label>

                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={offerData.description}
                  onChange={handleChange}
                  placeholder="Enter Offer Description"
                ></textarea>

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-success me-2"
            >
              Save Offer
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}