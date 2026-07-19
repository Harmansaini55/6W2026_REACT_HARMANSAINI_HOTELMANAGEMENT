import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StaffService from "../../../services/StaffService";

export default function StaffList() {
  const navigate = useNavigate();

  const [staffList, setStaffList] = useState([]);


  useEffect(() => {

    loadStaff();

  }, []);



  const loadStaff = async () => {

    const data = await StaffService.getAllStaff();

    setStaffList(data);

  };

  const handleDelete = async (id) => {

    if (window.confirm("Are you sure you want to delete this staff?")) {


      await StaffService.deleteStaff(id);


      loadStaff();


    }

  };


  return (
    <div className="container py-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white d-flex justify-content-between">
          <h3>Staff List</h3>

          <button className="btn btn-dark"
            onClick={() => navigate("/admin/add-staff")}
          >
            + Add Staff
          </button>
        </div>


        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead className="table-light">

              <tr>
                
                <th>ID</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {

                staffList.map((staff) => (

                  <tr key={staff.id}>

                    <td>{staff.id}</td>

                    <td>
                      <img
                        src={staff.image}
                        alt="Staff"
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          objectFit: "cover"
                        }}
                      />
                    </td>

                    <td>{staff.name}</td>

                    <td>{staff.department}</td>

                    <td>{staff.designation}</td>

                    <td>{staff.phone}</td>
                    <td>{staff.gender}</td>


                    <td>
                      <span className="badge bg-success">
                        {staff.status}
                      </span>
                    </td>


                    <td style={{ whiteSpace: "nowrap" }}>

                      <button className="btn btn-info btn-sm me-2 ms-0"
                        onClick={() => navigate(`/admin/staff-details/${staff.id}`)}
                      >
                        View
                      </button>


                      <button
                        className="btn btn-warning btn-sm me-2 ms-0"
                        onClick={() => navigate(`/admin/edit-staff/${staff.id}`)}
                      >
                        Edit
                      </button>


                      <button
                        className="btn btn-sm btn-danger "
                        onClick={() => handleDelete(staff.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}