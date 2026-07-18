import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ServiceService from "../../../services/ServiceService";

export default function Services() {
     const navigate = useNavigate();

    const [serviceData, setServiceData] = useState({

        customerName: "",
        serviceName: "",
        request: ""

    });



    const handleChange = (e) => {

        setServiceData({

            ...serviceData,

            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();
        

        if (
            !serviceData.customerName ||
            !serviceData.serviceName
        ) {

            toast.error("Please select service and enter name");

            return;

        }



        const newService = {

    ...serviceData,

    serviceId: Date.now(),

    category: "Hotel Service",

    price: 0,

    description: serviceData.request,

    status: "Pending",

    createdAt: new Date().toISOString()

};


await ServiceService.addService(newService);


          
        toast.success("Service Request Sent Successfully");
       
         navigate("/customer");
        setTimeout(() => {
            navigate("/customer");
        }, 2000);

        setServiceData({

            customerName: "",
            serviceName: "",
            request: ""

        });

    };



    return (

        <div className="container py-5">


            <div className="text-center mb-5">

                <h2 className="fw-bold">
                    Request Hotel Service
                </h2>

                <p>
                    Choose your required hotel service
                </p>

            </div>



            <div className="card shadow border-0">

                <div className="card-body">


                    <form onSubmit={handleSubmit}>


                        <div className="mb-3">

                            <label className="form-label">
                                Customer Name
                            </label>

                            <input

                                type="text"

                                name="customerName"

                                className="form-control"

                                value={serviceData.customerName}

                                onChange={handleChange}
                                      placeholder="Enter your name"
                            />

                        </div>



                        <div className="mb-3">

                            <label className="form-label">
                                Select Service
                            </label>


                            <select

                                name="serviceName"

                                className="form-select"

                                value={serviceData.serviceName}

                                onChange={handleChange}

                            >

                                <option value="" disabled hidden>
                                    Select Service
                                </option>

                                <option>
                                    Room Cleaning
                                </option>

                                <option>
                                    Laundry Service
                                </option>

                                <option>
                                    Food Service
                                </option>

                                <option>
                                    Extra Bed
                                </option>

                                <option>
                                    Airport Pickup
                                </option>

                                <option>
                                    Spa Service
                                </option>


                            </select>


                        </div>




                        <div className="mb-3">

                            <label className="form-label">
                                Special Request
                            </label>


                            <textarea

                                name="request"

                                className="form-control"

                                rows="4"

                                value={serviceData.request}

                                onChange={handleChange}
                                   placeholder="Enter your Special Request"
                            ></textarea>


                        </div>



                        <button
                            type="submit"
                            className="btn btn-success"
                        >

                            Send Request

                        </button>


                    </form>


                </div>

            </div>


        </div>

    );

}