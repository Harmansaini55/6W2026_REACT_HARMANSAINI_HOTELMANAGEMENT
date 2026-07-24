import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceService from "../../../services/ServiceService";

export default function ServiceList() {

  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

 const loadServices = async () => {

  const data = await ServiceService.getAllServices();

  setServices(data);

};

 const handleDelete = async (id) => {

  if(window.confirm("Are you sure you want to delete this service?")){

    await ServiceService.deleteService(id);

    loadServices();

  }

};

  const filteredServices = services.filter((service) =>
    service.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          Hotel Services List
        </h2>

        <button
          className="btn btn-success"
          onClick={() => navigate("/admin/add-service")}
        >
          + Add Service
        </button>

      </div>

      <div className="card shadow">

        <div className="card-header bg-dark text-white">

          <h5 className="mb-0">
            Manage Services
          </h5>

        </div>

        <div className="card-body">


          <div className="table-responsive">

            <table className="table table-bordered table-hover">

              <thead className="table-dark">

                <tr>

                  <th>s.no</th>
                  <th>Service Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredServices.length > 0 ? (

                  filteredServices.map((service, index) => (

                    <tr key={service.id}>

                      <td>{index + 1}</td>

                      <td>{service.serviceName}</td>

                      <td>{service.category}</td>

                      <td>₹ {service.price}</td>

                     <td className="text-truncate" style={{maxWidth:"250px"}}>
                      {service.description}
                        </td>

                      <td>

                        <span
                          className={
                            service.status === "Available"
                              ? "badge bg-success"
                              : "badge bg-danger"
                          }
                        >
                          {service.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() =>
                            navigate(`/admin/service-details/${service.id}`)
                          }
                        >
                          View
                        </button>

                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() =>
                            navigate(`/admin/edit-service/${service.id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(service.id)}
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan="7" className="text-center">
                      No Services Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}