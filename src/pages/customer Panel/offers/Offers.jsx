import { useEffect, useState } from "react";
import OfferService from "../../../services/OfferService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Offers() {
const navigate = useNavigate();
    const [offers, setOffers] = useState([]);


  useEffect(()=>{

const loadOffers=async()=>{

 const data = await OfferService.getAllOffers();

 setOffers(data);

}

loadOffers();

},[]);

  const handleApplyOffer = (offer) => {

  localStorage.setItem(
    "selectedOffer",
    JSON.stringify(offer)
  );

  toast.success("Offer Applied Successfully");

  setTimeout(() => {
    navigate("/customer/browse-rooms");
  }, 1500);
};
    return (

        <div className="container py-5">


            <div className="text-center mb-5">

                <h2 className="fw-bold">
                    Available Offers
                </h2>

                <p className="text-muted">
                    Enjoy our latest hotel deals and discounts
                </p>

            </div>



            <div className="row">


                {
                    offers.length > 0 ? (

                        offers.map((offer) => (


                            <div
                                className="col-md-4 mb-4"
                                key={offer.id}
                            >

                                <div className="card shadow border-0 h-100">


                                    <div className="card-body text-center">


                                        <h3 className="fw-bold text-primary">
                                            {offer.offerName}
                                        </h3>


                                        <h4 className="text-success">
                                            {offer.discount}% OFF
                                        </h4>


                                        <p>
                                            {offer.description}
                                        </p>


                                        <p>
                                            <b>Valid Till:</b> {offer.validDate}
                                        </p>

                                        <button
                                            className="btn btn-dark"
                                            onClick={() => handleApplyOffer(offer)}
                                        >
                                            Apply Offer
                                        </button>

                                    </div>


                                </div>


                            </div>


                        ))

                    ) : (

                        <div className="text-center">

                            <h4 className="text-danger">
                                No Offers Available
                            </h4>

                        </div>

                    )


                }


            </div>


        </div>

    );

}