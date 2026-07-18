import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OfferService from "../../../services/OfferService";

export default function OfferList() {

  const navigate = useNavigate();

  const [offerList, setOfferList] = useState([]);


useEffect(() => {

  loadOffers();

}, []);



const loadOffers = async () => {

  const data = await OfferService.getAllOffers();

  setOfferList(data);

};


  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this offer?"
  );


  if(confirmDelete){

    await OfferService.deleteOffer(id);

    loadOffers();

  }

};

  return (

    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

          <h3>Offer List</h3>

          <button
            className="btn btn-dark"
            onClick={() => navigate("/admin/add-offer")}
          >
           +Add Offer
          </button>

        </div>

        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>Offer Name</th>
                <th>Offer Type</th>
                <th>Discount</th>
                <th>Valid To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {
                offerList.length > 0 ? (

                  offerList.map((offer) => (

                    <tr key={offer.id}>

                      <td>{offer.id}</td>
                      <td>{offer.offerName}</td>
                      <td>{offer.offerType}</td>
                      <td>{offer.discount}</td>
                      <td>{offer.validTo}</td>
                      <td>{offer.status}</td>

                      <td>

                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => navigate(`/admin/offer-details/${offer.id}`)}
                        >
                          View
                        </button>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => navigate(`/admin/edit-offer/${offer.id}`)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(offer.id)}
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="7" className="text-center">
                      No Offers Available
                    </td>
                  </tr>

                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}