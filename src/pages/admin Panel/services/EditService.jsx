import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceService from "../../../services/ServiceService";

export default function EditService() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState({

    id: "",
    serviceName: "",
    category: "",
    price: "",
    description: "",
    status: "Available",

  });

  useEffect(() => {

  loadService();

}, [id]);


const loadService = async () => {

  const service = await ServiceService.getServiceById(id);


  if(service){

    setServiceData(service);

  }

};

  const handleChange = (e) => {

    const { name, value } = e.target;

    setServiceData({

      ...serviceData,
      [name]: value,

    });

  };

const handleUpdate = async (e) => {

  e.preventDefault();


  await ServiceService.updateService(serviceData);


  alert("Service Updated Successfully");


  navigate("/admin/services");

};

  return (

    <div className="container py-4">

      <div className="card shadow-lg">

        <div className="card-header bg-warning">

          <h3>Edit Service</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleUpdate}>

            <div className="row">

              {/* Service Name */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Service Name
                </label>

                <select
                  className="form-select"
                  name="serviceName"
                  value={serviceData.serviceName}
                  onChange={handleChange}
                >
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

              {/* Category */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Category
                </label>

                <select
                  className="form-select"
                  name="category"
                  value={serviceData.category}
                  onChange={handleChange}
                >
                  <option>Accommodation</option>
                  <option>Housekeeping</option>
                  <option>Food & Beverage</option>
                  <option>Transport</option>
                  <option>Wellness</option>
                  <option>Recreation</option>
                </select>

              </div>

              {/* Price */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Price</label>

                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={serviceData.price}
                  onChange={handleChange}
                />

              </div>

              {/* Status */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Status
                </label>

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

              {/* Description */}

              <div className="col-md-12 mb-3">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={serviceData.description}
                  onChange={handleChange}
                />

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-warning me-2"
            >
              Update Service
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/service-list")}
            >
              Cancel
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}