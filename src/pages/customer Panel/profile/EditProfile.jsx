import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({

        id: "",
        name: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        dateOfBirth: "",
        age: "",
        pincode: "",
         profileImage: "",

    });



    // Get Login User Data

    useEffect(() => {

        const getUser = async () => {

            const user = await AuthService.getData();

            console.log("Login User:", user);


            if (user) {

                setProfile({

                    id: user.id,

                    name: user.name || "",
                    email: user.email || "",
                    mobile: user.mobile || "",
                    gender: user.gender || "",
                    address: user.address || "",
                    city: user.city || "",
                    state: user.state || "",
                    dateOfBirth: user.dateOfBirth || "",
                    age: user.age || "",
                    pincode: user.pincode || "",
                    profileImage:user.profileImage ||"",
                     
                });

            }

        };


        getUser();


    }, []);



    // Input Change

    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const handleImageChange = (e)=>{

    const file = e.target.files[0];


    if(file){

        const reader = new FileReader();


        reader.onload = ()=>{

            setProfile({

                ...profile,

                profileImage: reader.result

            });

        };


        reader.readAsDataURL(file);

    }

};

    const handleUpdate = async () => {

        try {

            await UserService.updateProfile(profile);


            await AuthService.setData(profile);


            toast.success("Profile Updated Successfully");

            setTimeout(() => {
                navigate("/customer/my-profile");
            }, 1000);



        } catch (error) {


            toast.error("Profile Update Failed");

        }

    };



    return (
   <>
        <div className="container mt-4">


            <h2>Edit Profile</h2>


            <div className="text-center mb-4">

                <label htmlFor="profileImage">

                    <img
                        src={
                            profile.profileImage
                                ? profile.profileImage
                                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }

                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            cursor: "pointer"
                        }}

                    />

                </label>


                <input

                    type="file"

                    id="profileImage"

                    accept="image/*"

                    style={{ display: "none" }}

                    onChange={handleImageChange}

                />


            </div>


            <input

                className="form-control mb-3"

                name="email"

                value={profile.email}

                onChange={handleChange}

                placeholder="Email"

            />



            <input

                className="form-control mb-3"

                name="mobile"

                value={profile.mobile}

                onChange={handleChange}

                placeholder="Mobile"

            />



            <input

                className="form-control mb-3"

                name="address"

                value={profile.address}

                onChange={handleChange}

                placeholder="Address"

            />



            <input

                className="form-control mb-3"

                name="city"

                value={profile.city}

                onChange={handleChange}

                placeholder="City"

            />



            <input

                className="form-control mb-3"

                name="state"

                value={profile.state}

                onChange={handleChange}

                placeholder="State"

            />

            <input

                className="form-control mb-3"

                name="dateOfBirth"

                type="date"

                value={profile.dateOfBirth}

                onChange={handleChange}

                min="1950-01-01"
                max={new Date().toISOString().split("T")[0]}
            />

            <input

                className="form-control mb-3"

                name="age"

                value={profile.age}

                onChange={handleChange}

                placeholder="Age"

            />


            <input

                className="form-control mb-3"

                name="pincode"

                value={profile.pincode}

                onChange={handleChange}

                placeholder="Pincode"

            />



            <button

                className="btn btn-primary"

                onClick={handleUpdate}

            >

                Update Profile

            </button>


        </div>
         
         </>
        
    
    );


}


export default EditProfile;