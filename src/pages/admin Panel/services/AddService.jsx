import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceService from "../../../services/ServiceService";
export default function AddService() {

  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState({
    serviceName: "",
    category: "",
    price: "",
    description: "",
    status: "Available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  const handleSave = async (e) => {

  e.preventDefault();


  const newService = {
    ...serviceData,
    price: Number(serviceData.price),
  };


  await ServiceService.addService(newService);


  alert("Service Added Successfully");


  navigate("/admin/services");

};

   
  const handleReset = () => {

    setServiceData({
      serviceName: "",
      category: "",
      price: "",
      description: "",
      status: "Available",
    });

  };

  return (
    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3>Add Hotel Service</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSave}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Service Name</label>

                <select
                  className="form-select"
                  name="serviceName"
                  value={serviceData.serviceName}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Select Service</option>
                  <option>Room Service</option>
                  <option>Laundry Service</option>
                  <option>Housekeeping</option>
                  <option>Spa & Wellness</option>
                  <option>Airport Pickup & Drop</option>
                  <option>Restaurant / Food Service</option>
                  <option>Swimming Pool</option>
                  <option>Gym / Fitness Center</option>
                  <option>Free Wi-Fi</option>
                  <option>Parking Facility</option>
                </select>

              </div>

              <div className="col-md-6 mb-3">

                <label>Category</label>

                <select
                  className="form-select"
                  name="category"
                  value={serviceData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Select Category</option>
                  <option>Accommodation</option>
                  <option>Food & Beverage</option>
                  <option>Transport</option>
                  <option>Wellness</option>
                  <option>Housekeeping</option>
                  <option>Recreation</option>
                </select>

              </div>

              <div className="col-md-6 mb-3">

                <label>Price</label>

                <input
                  type="text"
                  className="form-control"
                  name="price"
                  placeholder="Enter Price"
                  value={serviceData.price}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={serviceData.status}
                  onChange={handleChange}
                >
                   
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>

              </div>

              <div className="col-md-12 mb-3">

                <label>Description</label>

                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  placeholder="Enter Service Description"
                  value={serviceData.description}
                  onChange={handleChange}
                ></textarea>

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-success me-2"
            >
              Save Service
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