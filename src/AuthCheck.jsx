import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/FirebaseConfig";
import AuthService from "./services/AuthService";


export default function AuthCheck() {


  const navigate = useNavigate();
  const location = useLocation();



  useEffect(() => {


    const unsubscribe = onAuthStateChanged(auth, async(user)=>{


      if(user){


        const currentUser = await AuthService.getData();



        console.log("Current User:", user);
        console.log("Customer Data:", currentUser);



        // Only login page auto redirect
        if(location.pathname === "/"){


          if(currentUser?.userType === 2){

            navigate("/customer", {
              replace:true
            });

          }


        }


      }


    });



    return ()=>unsubscribe();


  },[navigate, location]);



  return null;

}