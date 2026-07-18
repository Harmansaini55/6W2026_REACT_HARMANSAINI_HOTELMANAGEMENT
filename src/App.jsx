import "./firebase/FirebaseConfig"
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes,Route } from "react-router-dom"
import { Navigate} from "react-router-dom";
import AuthCheck from "./AuthCheck";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AdminLogin from "./pages/admin Panel/admin login/AdminLogin";
import Layout from "./pages/admin Panel/layout/Layout";
import AdminDashboard from "./pages/admin Panel/admin dashboard/AdminDashboard";
import RoomList from "./pages/admin Panel/rooms/RoomList";
import AddRoom from "./pages/admin Panel/rooms/AddRoom";
import EditRoom from  "./pages/admin Panel/rooms/EditRoom";
import RoomDetails from "./pages/admin Panel/rooms/RoomDetails";
import CustomerList from "./pages/admin Panel/customers/CustomerList";
import EditCustomer from "./pages/admin Panel/customers/EditCustomer";
import CustomerDetails from "./pages/admin Panel/customers/CustomerDetails";
import BookingList from "./pages/admin Panel/bookings/BookingList";
import CheckInCustomers from "./pages/admin Panel/bookings/CheckInCustomers";
import CheckOutCustomers from "./pages/admin Panel/bookings/CheckOutCustomers";
import BookingsDetails from "./pages/admin Panel/bookings/BookingsDetails";
import EditBooking from "./pages/admin Panel/bookings/EditBooking";
import PaymentDetails from "./pages/admin Panel/payments/PaymentDetails";
import PaymentList from "./pages/admin Panel/payments/PaymentList";
import ServiceList from "./pages/admin Panel/services/ServiceList";
import AddService from "./pages/admin Panel/services/AddService";
import EditService from "./pages/admin Panel/services/EditService";
import ServiceDetails from "./pages/admin Panel/services/ServiceDetails";
import StaffList from "./pages/admin Panel/staff/StaffList";
import AddStaff from "./pages/admin Panel/staff/AddStaff";
import EditStaff from "./pages/admin Panel/staff/EditStaff";
import StaffDetails from "./pages/admin Panel/staff/StaffDetails";
import OfferList from "./pages/admin Panel/offers/OfferList";
import AddOffer from "./pages/admin Panel/offers/AddOffer";
import EditOffer from "./pages/admin Panel/offers/EditOffer";
import OfferDetails from "./pages/admin Panel/offers/OfferDetails";
import BookingReport from "./pages/admin Panel/reports/BookingReport";
import PaymentReport from "./pages/admin Panel/reports/PaymentReport";
import CustomerReport from "./pages/admin Panel/reports/CustomerReport";

import CustomerLayout from "./pages/customer Panel/customer layout/Layout";
import Dashboard from "./pages/customer Panel/dashboard/Dashboard";
import BrowseRooms from "./pages/customer Panel/browse rooms/BrowseRooms";
import BrowseRoomDetails from "./pages/customer Panel/browse rooms/BrowseRoomDetails";
import BookRoom from "./pages/customer Panel/booking/BookRoom";
import BookingStatus from "./pages/customer Panel/booking/BookingStatus";
import BookingHistory from "./pages/customer Panel/booking/BookingHistory";
import PaymentHistory from "./pages/customer Panel/payments/PaymentHistory";
import RequestService from "./pages/customer Panel/services/RequestService";
import Offers from "./pages/customer Panel/offers/Offers";
import SubmitFeedback from "./pages/customer Panel/feedback/SubmitFeedback";


function ProtectedRoute({ children, type }) {

  let currentUser = null;


  if(type === 1){

    currentUser =
    JSON.parse(localStorage.getItem("adminUser"));

  }


  if(type === 2){

    currentUser =
    JSON.parse(localStorage.getItem("customerUser"));

  }


  if(!currentUser){

    sessionStorage.setItem(
      "unauthorized",
      "true"
    );


    if(type === 1){

      return <Navigate to="/admin-login" replace />;

    }


    return <Navigate to="/" replace />;

  }



  return children;

}

function App() {
  return (
    <>
     <BrowserRouter>
     <AuthCheck/>
     <Routes>
      <Route path="/" element={<Login/>}></Route>
       <Route path="/register" element={<Register/>}></Route>
       <Route path="/admin-login" element={<AdminLogin/>}></Route>

      <Route path="/admin" element={ <ProtectedRoute type={1}><Layout /> </ProtectedRoute>}>
       <Route index element={<AdminDashboard />} />
      <Route path="room" element={<RoomList />} /> 
      <Route path="add-room" element={<AddRoom />} />
      <Route path="edit-room/:id" element={<EditRoom />} />
      <Route path="room-details/:id" element={<RoomDetails />} />
     <Route path="customer-list" element={<CustomerList />} />
      <Route path="edit-customer/:id" element={<EditCustomer />} />
      <Route path="customer-details/:id" element={<CustomerDetails />} />
      <Route path="booking-list" element={<BookingList />} />
      <Route path="checkin" element={<CheckInCustomers />} />
      <Route path="checkout" element={<CheckOutCustomers />} />
      <Route path="bookings-details/:id" element={<BookingsDetails />} />
      <Route path="edit-booking/:id" element={<EditBooking />} />
      <Route path="payment-details/:id" element={<PaymentDetails />} />
      <Route path="payments" element={<PaymentList/>}/>
       <Route path="services" element={<ServiceList/>}/>
       <Route path="add-service" element={<AddService/>}/>
       <Route path="edit-service/:id" element={<EditService/>}/>
         <Route path="service-details/:id" element={<ServiceDetails/>}/>
         <Route  path="staff-list" element={<StaffList />} />
        <Route path="add-staff" element={<AddStaff />} />
       <Route path="edit-staff/:id" element={<EditStaff />} />
      <Route path="staff-details/:id" element={<StaffDetails />} />
       <Route path="offer-list" element={ <OfferList />} />
       <Route path="add-offer" element={<AddOffer/>}/>
        <Route path="edit-offer/:id" element={<EditOffer/>}/>
        <Route path="offer-details/:id" element={<OfferDetails/>}/>
        <Route path="booking-report" element={<BookingReport/>}/>
        <Route path="payment-report" element={<PaymentReport/>}/>
        <Route path="customer-report" element={<CustomerReport/>}/>
      </Route>

       <Route path="/customer" element={ <ProtectedRoute type={2}> <CustomerLayout /> </ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="browse-rooms" element={<BrowseRooms />} />
          <Route path="browse-room-details/:id" element={<BrowseRoomDetails />} />
        <Route path="book-room/:id" element={<BookRoom />} />
        <Route path="booking-status" element={<BookingStatus/>}/>
          <Route path="booking-history" element={<BookingHistory/>}/>
          <Route path="payment-history" element={<PaymentHistory/>}/>
          <Route path="request-hotel-services" element={<RequestService/>}/>
          <Route path="offers" element={<Offers/>}/>
          <Route path="feedback" element={<SubmitFeedback/>}/>
        </Route>
     </Routes>
      <ToastContainer />
     </BrowserRouter>
    
    </>
  )
}

export default App;
