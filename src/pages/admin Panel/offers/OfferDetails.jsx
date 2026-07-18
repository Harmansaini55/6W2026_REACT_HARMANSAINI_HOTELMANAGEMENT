import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OfferService from "../../../services/OfferService";

export default function OfferDetails() {

  const navigate = useNavigate();
  const { id } = useParams();

 const [offer, setOffer] = useState(null);


useEffect(()=>{

  loadOffer();

},[id]);



const loadOffer = async()=>{

  const data = await OfferService.getOfferById(id);


  setOffer(data);

};

  if (!offer) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          Offer Not Found
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/offer-list")}
        >
          Back
        </button>
      </div>
    );
  }

  return (

    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-info text-white">
          <h3>Offer Details</h3>
        </div>

        <div className="card-body">

          <table className="table table-bordered">

            <tbody>

              <tr>
                <th width="30%">Offer ID</th>
                <td>{offer.id}</td>
              </tr>

              <tr>
                <th>Offer Name</th>
                <td>{offer.offerName}</td>
              </tr>

              <tr>
                <th>Offer Type</th>
                <td>{offer.offerType}</td>
              </tr>

              <tr>
                <th>Discount</th>
                <td>{offer.discount}</td>
              </tr>

              <tr>
                <th>Valid From</th>
                <td>{offer.validFrom}</td>
              </tr>

              <tr>
                <th>Valid To</th>
                <td>{offer.validTo}</td>
              </tr>

              <tr>
                <th>Description</th>
                <td>{offer.description}</td>
              </tr>

              <tr>
                <th>Status</th>
                <td>
                  <span
                    className={
                      offer.status === "Active"
                        ? "badge bg-success"
                        : "badge bg-danger"
                    }
                  >
                    {offer.status}
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/offer-list")}
          >
            Back
          </button>

        </div>

      </div>

    </div>

  );
}