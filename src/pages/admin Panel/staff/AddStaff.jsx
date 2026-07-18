import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffService from "../../../services/StaffService";
import StaffModel from "../../../models/StaffModel";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/FirebaseConfig";

export default function AddStaff() {

  const navigate = useNavigate();

  const [staffData, setStaffData] = useState({
    name: "",
    gender: "",
    image:"",
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


  const handleChange = (e) => {

    const {name, value} = e.target;

    setStaffData({
      ...staffData,
      [name]: value
    });

  };
 const handleImageChange = (e) => {

  const file = e.target.files[0];

  setStaffData({
    ...staffData,
    image:file
  });

};



const handleSave = async (e) => {

  e.preventDefault();

  let imageUrl = "";

  if(staffData.image){

    const imageRef = ref(
      storage,
      `staffImages/${staffData.image.name}`
    );


    await uploadBytes(
      imageRef,
      staffData.image
    );


    imageUrl = await getDownloadURL(imageRef);

  }


  const newStaff = {

    ...staffData,
    image:imageUrl

  };


  await StaffService.addStaff(newStaff);


  alert("Staff Added Successfully");


  navigate("/admin/staff-list");

};
  const handleReset = () => {

    setStaffData({
      name: "",
      gender: "",
      image:"",
      phone: "",
      email: "",
      address: "",
      department: "",
      designation: "",
      joiningDate: "",
      salary: "",
      shift: "",
      status: "Active",
    });

  };


  return (

    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3>Add Staff</h3>
        </div>


        <div className="card-body">

          <form onSubmit={handleSave}>


            <div className="row">


              <div className="col-md-6 mb-3">
                <label>Staff Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={staffData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
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
                  <option value="" disabled hidden>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>

              </div>
              <div className="col-md-6 mb-3">
              <label>Staff Image</label>

                  <input
                   type="file"
                     className="form-control"
                     name="image"
                      accept="image/*"
                    onChange={handleImageChange}
                     />
                     </div>


              <div className="col-md-6 mb-3">
                <label>Phone</label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={staffData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone"
                />

              </div>


              <div className="col-md-6 mb-3">
                <label>Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={staffData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />

              </div>


              <div className="col-md-6 mb-3">
                <label>Department</label>

                <select
                  className="form-select"
                  name="department"
                  value={staffData.department}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Select Department</option>
                  <option>Reception</option>
                  <option>Housekeeping</option>
                  <option>Kitchen</option>
                  <option>Security</option>
                  <option>Management</option>
                </select>

              </div>


              <div className="col-md-6 mb-3">
                 <label>Designation</label>

                     <select
                      className="form-select"
                            name="designation"
                            value={staffData.designation}
                             onChange={handleChange}
                         >
                     <option value="" disabled hidden>Select Designation</option>
                     <option>Hotel Manager</option>
                    <option>Assistant Manager</option>
                    <option>Receptionist</option>
                      <option>Chef</option>
                     <option>Waiter</option>
                       <option>Housekeeping Staff</option>
                          <option>Room Attendant</option>
                             <option>Security Guard</option>
                          <option>Cleaner</option>
                         <option>Maintenance Staff</option>
                            </select>
                         </div>

              <div className="col-md-6 mb-3">
                <label>Joining Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="joiningDate"
                  value={staffData.joiningDate}
                  onChange={handleChange}
                />

              </div>


              <div className="col-md-6 mb-3">
                <label>Salary</label>

                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  value={staffData.salary}
                  onChange={handleChange}
                  placeholder="Enter Salary"
                />

              </div>


              <div className="col-md-6 mb-3">
                <label>Shift</label>

                <select
                  className="form-select"
                  name="shift"
                  value={staffData.shift}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Select Shift</option>
                  <option>Morning</option>
                  <option>Evening</option>
                  <option>Night</option>
                </select>

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
                  rows="3"
                   placeholder="Enter your staff address"
                ></textarea>

              </div>


            </div>


           <button
               type="submit"
                className="btn btn-success me-2"
                 >
               Save Staff
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