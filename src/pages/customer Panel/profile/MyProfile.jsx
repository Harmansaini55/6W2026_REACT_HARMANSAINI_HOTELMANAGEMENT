import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/AuthService";

export default function MyProfile() {

    const [user, setUser] = useState({});

    useEffect(() => {

        const loadProfile = async () => {

            const currentUser = await AuthService.getData();

            if (currentUser) {
                setUser(currentUser);
            }

        };

        loadProfile();

    }, []);

    return (

        <div className="container py-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>My Profile</h3>

                </div>

                <div className="card-body text-center">

                    <img
                        src={
                            user.profileImage
                                ? user.profileImage
                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                    />

                    <h3 className="mt-3">
                        {user.name}
                    </h3>

                    <hr />

                    <div className="row text-start">

                        <div className="col-md-6 mb-3">
                            <strong>Name</strong>
                            <p>{user.name}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Email</strong>
                            <p>{user.email}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Mobile Number</strong>
                            <p>{user.mobile}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Gender</strong>
                            <p>{user.gender}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>City</strong>
                            <p>{user.city}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>State</strong>
                            <p>{user.state}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Date of Birth</strong>
                            <p>{user.dateOfBirth}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Age</strong>
                            <p>{user.age}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                            <strong>Pincode</strong>
                            <p>{user.pincode}</p>
                        </div>

                    </div>

                    <Link
                        to="/customer/edit-profile"
                        className="btn btn-primary"
                    >
                        Edit Profile
                    </Link>

                </div>

            </div>

        </div>

    );

}