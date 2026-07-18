import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceService from "../../../services/ServiceService";

export default function ServiceDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);

 useEffect(() => {

  loadService();

}, [id]);


const loadService = async () => {

  const data = await ServiceService.getServiceById(id);


  if(data){

    setService(data);

  }

};
  if (!service) {

    return (
      <div className="container py-5 text-center">
        <h3>Service Not Found</h3>

        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/admin/services")}
        >
          Back
        </button>

      </div>
    );

  }

  return (

    <div className="container py-4">

      <div className="card shadow-lg">

        <div className="card-header bg-info text-white">

          <h3>Service Details</h3>

        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="fw-bold">
                Service Name
              </label>

              <p>{service.serviceName}</p>

            </div>

            <div className="col-md-6 mb-3">

              <label className="fw-bold">
                Category
              </label>

              <p>{service.category}</p>

            </div>

            <div className="col-md-6 mb-3">

              <label className="fw-bold">
                Price
              </label>

              <p>₹ {service.price}</p>

            </div>

            <div className="col-md-6 mb-3">

              <label className="fw-bold">
                Status
              </label>

              <p>

                <span
                  className={
                    service.status === "Available"
                      ? "badge bg-success"
                      : "badge bg-danger"
                  }
                >
                  {service.status}
                </span>

              </p>

            </div>

            <div className="col-md-12 mb-3">

              <label className="fw-bold">
                Description
              </label>

              <p>{service.description}</p>

            </div>

          </div>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/admin/services")}
          >
            Back
          </button>

        </div>

      </div>

    </div>

  );

}