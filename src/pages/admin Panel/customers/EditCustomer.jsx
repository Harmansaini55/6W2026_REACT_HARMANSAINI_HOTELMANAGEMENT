import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerService from "../../../services/CustomerService";

export default function EditCustomer() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({

    id: "",

    image: "",

    fullName: "",

    email: "",

    mobile: "",

    gender: "",

    dob: "",

    city: "",

    address: "",

    idProof: "",

    idNumber: "",

    status: "Active",

  });

 useEffect(() => {

  loadCustomer();

}, [id]);

const loadCustomer = async () => {

  try {

    const customer = await CustomerService.getCustomerById(id);

    if (customer) {

      setCustomerData(customer);

    }

  } catch (error) {

    alert(error.message);

  }

};

  const handleChange = (e) => {

    const { name, value } = e.target;

    setCustomerData({
      ...customerData,
      [name]: value,
    });

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setCustomerData({
        ...customerData,
        image: reader.result,
      });

    };

    reader.readAsDataURL(file);

  };

 const handleUpdate = async (e) => {

  e.preventDefault();

  try {

    await CustomerService.updateCustomer(customerData);

    alert("Customer Updated Successfully");

    navigate("/admin/customer-list");

  } catch (error) {

    alert(error.message);

  }

};

if (!customerData.id) {

  return null;

}

  return (

    <div className="container py-4">

      <div className="card shadow-lg border-0">

        <div className="card-header bg-warning">

          <h3 className="mb-0">
            ✏ Edit Customer
          </h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleUpdate}>

            <div className="row">

              {/* Customer Image */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Customer Image
                </label>

                <input
                  type="file"
                  className="form-control"
                  onChange={handleImage}
                />

              </div>

              {/* Full Name */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={customerData.fullName}
                  onChange={handleChange}
                />

              </div>

              {/* Email */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={customerData.email}
                  onChange={handleChange}
                />

              </div>
                {/*Room Number*/}
                   <div className="col-md-6 mb-3">

                <label className="form-label">
                  Room Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="roomNumber"
                  value={customerData.roomNumber}
                  onChange={handleChange}
                   placeholder="Enter Room Number"
                />

              </div>
              {/* Mobile */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Mobile Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={customerData.mobile}
                  onChange={handleChange}
                />

              </div>
                            {/* Gender */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Gender
                </label>

                <select
                  className="form-select"
                  name="gender"
                  value={customerData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

              </div>


              {/* Date of Birth */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Date of Birth
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={customerData.dob}
                  onChange={handleChange}
                />

              </div>


              {/* City */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  City
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={customerData.city}
                  onChange={handleChange}
                />

              </div>


              {/* Address */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Address
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  name="address"
                  value={customerData.address}
                  onChange={handleChange}
                />

              </div>


              {/* ID Proof */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  ID Proof Type
                </label>

                <select
                  className="form-select"
                  name="idProof"
                  value={customerData.idProof}
                  onChange={handleChange}
                >
                  <option value="">Select ID Proof</option>
                  <option>Aadhaar Card</option>
                  <option>PAN Card</option>
                  <option>Driving License</option>
                  <option>Passport</option>
                  <option>Voter ID</option>
                </select>

              </div>


              {/* ID Number */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  ID Proof Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="idNumber"
                  value={customerData.idNumber}
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
                  value={customerData.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

              </div>

            </div>


            <div className="mt-4">

              <button
                type="submit"
                className="btn btn-success me-2"
              >
                Update Customer
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/admin/customer")}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}