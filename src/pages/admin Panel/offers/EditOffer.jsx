import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OfferService from "../../../services/OfferService";

export default function EditOffer() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [offerData, setOfferData] = useState({

    id: "",
    offerName: "",
    offerType: "",
    discount: "",
    roomType: "",
    validFrom: "",
    validTo: "",
    description: "",
    status: "Active",

  });


  useEffect(() => {

    loadOffer();

  }, [id]);



  const loadOffer = async () => {

    const data = await OfferService.getOfferById(id);


    if (data) {

      setOfferData(data);

    }

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setOfferData({
      ...offerData,
      [name]: value,
    });

  };

  const handleUpdate = async (e) => {

    e.preventDefault();


    await OfferService.updateOffer(offerData);


    alert("Offer Updated Successfully");


    navigate("/admin/offer-list");

  };

  const handleReset = () => {

    loadOffer();

  };


  return (

    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-warning">
          <h3>Edit Offer</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleUpdate}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Offer Name</label>

                <select
                  className="form-select"
                  name="offerName"
                  value={offerData.offerName}
                  onChange={handleChange}
                >
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
                ><option>Seasonal</option>
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
                ></textarea>

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-warning me-2"
            >
              Update Offer
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