import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StaffService from "../../../services/StaffService";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/FirebaseConfig";

export default function EditStaff() {

  const { id } = useParams();
  const navigate = useNavigate();


 const [staffData, setStaffData] = useState({
  name: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  department: "",
  designation: "",
  joiningDate: "",
  salary: "",
  shift: "",
  status: "Active",
  image: ""
});

useEffect(() => {

  loadStaff();

}, [id]);


const loadStaff = async () => {

  const data = await StaffService.getStaffById(id);

  if(data){

    setStaffData(data);

  }

};


  const handleChange = (e) => {

    const {name, value} = e.target;

    setStaffData({
      ...staffData,
      [name]: value
    });

  };
     const handleImageChange = (e) => {
     const file = e.target.files[0];

  if (file) {
    setStaffData({
      ...staffData,
      image: URL.createObjectURL(file),
    });
  }
};

  const handleUpdate = (e) => {

    e.preventDefault();


    const updatedStaff = {
      id: Number(id),
      ...staffData
    };


    StaffService.updateStaff(updatedStaff);


    alert("Staff Updated Successfully");


    navigate("/admin/staff-list");

  };


  return (

    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-warning">
          <h3>Edit Staff</h3>
        </div>


        <div className="card-body">

          <form onSubmit={handleUpdate}>

            <div className="row">


              <div className="col-md-6 mb-3">
                <label>Staff Name</label>

                <input
                  className="form-control"
                  name="name"
                  value={staffData.name}
                  onChange={handleChange}
                />

              </div>


              <div className="col-md-6 mb-3">
                <label>Gender</label>

                <select
                  className="form-select"
                  name="gender"
                  value={staffData.gender}
                  onChange={handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>

              </div>

               <div className="col-md-6 mb-3">
               <label>Staff Image</label>

                 <input
                   type="file"
                    className="form-control"
                   accept="image/*"
                     onChange={handleImageChange}
                      />
                       </div>


              <div className="col-md-6 mb-3">
                <label>Phone</label>

                <input
                  className="form-control"
                  name="phone"
                  value={staffData.phone}
                  onChange={handleChange}
                />

              </div>


              <div className="col-md-6 mb-3">
                <label>Email</label>

                <input
                  className="form-control"
                  name="email"
                  value={staffData.email}
                  onChange={handleChange}
                />

              </div>


              <div className="col-md-6 mb-3">
                <label>Department</label>

                <input
                  className="form-control"
                  name="department"
                  value={staffData.department}
                  onChange={handleChange}
                />

              </div>


              <div className="col-md-6 mb-3">
                <label>Designation</label>

                <input
                  className="form-control"
                  name="designation"
                  value={staffData.designation}
                  onChange={handleChange}
                />

              </div>


              <div className="col-md-6 mb-3">
                <label>Salary</label>

                <input
                  className="form-control"
                  name="salary"
                  value={staffData.salary}
                  onChange={handleChange}
                />

              </div>


              <div className="col-md-6 mb-3">
                <label>Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={staffData.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

              </div>


              <div className="col-md-12 mb-3">

                <label>Address</label>

                <textarea
                  className="form-control"
                  name="address"
                  value={staffData.address}
                  onChange={handleChange}
                ></textarea>

              </div>


            </div>


            <button className="btn btn-success">
              Update Staff
            </button>


          </form>

        </div>

      </div>

    </div>

  );

}