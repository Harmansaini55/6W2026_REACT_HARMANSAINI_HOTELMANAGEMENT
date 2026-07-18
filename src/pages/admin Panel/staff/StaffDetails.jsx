import { useParams, useNavigate } from "react-router-dom";
import StaffService from "../../../services/StaffService";
import { useEffect, useState } from "react";

export default function StaffDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

 const [staff, setStaff] = useState(null);


useEffect(() => {

  loadStaff();

}, [id]);



const loadStaff = async () => {

  const data = await StaffService.getStaffById(id);

  setStaff(data);

};


  if (!staff) {
    return (
      <div className="container py-4">
        <h4>Staff Not Found</h4>
      </div>
    );
  }


  return (

    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3>Staff Details</h3>
        </div>


        <div className="card-body">


          <div className="text-center mb-4">

            <img
              src={staff.image}
              alt="staff"
              width="120"
              height="120"
              className="rounded-circle"
            />

          </div>


          <div className="row">


            <div className="col-md-6 mb-3">
              <b>Staff ID:</b> {staff.id}
            </div>


            <div className="col-md-6 mb-3">
              <b>Name:</b> {staff.name}
            </div>


            <div className="col-md-6 mb-3">
              <b>Gender:</b> {staff.gender}
            </div>


            <div className="col-md-6 mb-3">
              <b>Phone:</b> {staff.phone}
            </div>


            <div className="col-md-6 mb-3">
              <b>Email:</b> {staff.email}
            </div>


            <div className="col-md-6 mb-3">
              <b>Department:</b> {staff.department}
            </div>


            <div className="col-md-6 mb-3">
              <b>Designation:</b> {staff.designation}
            </div>


            <div className="col-md-6 mb-3">
              <b>Joining Date:</b> {staff.joiningDate}
            </div>


            <div className="col-md-6 mb-3">
              <b>Salary:</b> ₹{staff.salary}
            </div>


            <div className="col-md-6 mb-3">
              <b>Shift:</b> {staff.shift}
            </div>


            <div className="col-md-6 mb-3">
              <b>Status:</b> {staff.status}
            </div>


            <div className="col-md-12 mb-3">
              <b>Address:</b> {staff.address}
            </div>


          </div>


          <button
            className="btn btn-secondary"
            onClick={() => navigate("/admin/staff-list")}
          >
            Back
          </button>


        </div>

      </div>

    </div>

  );

}