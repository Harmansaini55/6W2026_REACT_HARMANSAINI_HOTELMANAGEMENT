import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function Dashboard() {
  return (
    <>
      {/* Hero Area */}
      <section className="hero-area">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
        >
          <SwiperSlide>
            <div
              className="single-hero-slide d-flex align-items-center justify-content-center"
              style={{
                backgroundImage: "url('/img/bg-img/bg-10.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                
              }}
            >
              <div className="container text-center text-white" >
             
                <h1>Welcome to Hotel Booking System</h1>
                <p>
                  Enjoy a luxurious stay with comfortable rooms, modern
                  facilities and the best hospitality.
                </p>

                <Link
                  to="/customer/browse-rooms"
                  className="btn palatin-btn me-3"
                >
                  Browse Rooms
                </Link>

                <Link
                  to="/customer/book-room"
                  className="btn palatin-btn"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="single-hero-slide d-flex align-items-center justify-content-center"
              style={{
                backgroundImage: "url('/img/bg-img/bg-2.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
              }}
            >
              <div className="container text-center text-white">
                <h1>Luxury Rooms</h1>
                <p>Experience comfort and elegance at affordable prices.</p>

                <Link
                  to="/customer/browse-rooms"
                  className="btn palatin-btn"
                >
                  Explore Rooms
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="single-hero-slide d-flex align-items-center justify-content-center"
              style={{
                backgroundImage: "url('/img/bg-img/bg-3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
              }}
            >
              <div className="container text-center text-white" >
                <h1>Your Perfect Stay Starts Here</h1>

                <p>
                  Book your favourite room with just one click.
                </p>

                <Link
                  to="/customer/book-room"
                  className="btn palatin-btn"
                >
                  Reserve Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Book Now */}
      <div className="book-now-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="book-now-form">
                <form>

                  <div className="form-group">
                    <label>Check In</label>

                    <input
                      type="date"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label>Check Out</label>

                    <input
                      type="date"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label>Adults</label>

                    <select className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Children</label>

                    <select className="form-control">
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>

                  <button type="submit">
                    Book Now
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <section className="about-us-area"> 
  
        <div className="container"   style={{ backgroundColor: "#f8f5f0" }}>

          <div className="row align-items-center">

            <div className="col-lg-6">

              <div className="about-text mb-100">

                <div className="section-heading">

                  <h2>Welcome To Our Hotel</h2>

                </div>

                <p>
                  Our hotel offers luxury rooms,
                  delicious food,
                  swimming pool,
                  free Wi-Fi,
                  parking,
                  and 24/7 customer support
                  for a comfortable stay.
                </p>

                <div className="about-key-text">

                  <h6>✔ Luxury Rooms</h6>

                  <h6>✔ Free Wi-Fi</h6>

                  <h6>✔ Swimming Pool</h6>

                  <h6>✔ Restaurant</h6>

                  <h6>✔ Parking</h6>

                  <h6>✔ 24/7 Support</h6>

                </div>

                <Link
                  to="/customer/browse-rooms"
                  className="btn palatin-btn mt-4"
                >
                  Explore More
                </Link>

              </div>

            </div>

            <div className="col-lg-6">

              <img
                src="/img/bg-img/5.jpg"
                className="img-fluid rounded shadow"
                alt=""
              />

            </div>

          </div>

        </div>
      </section>

      {/* Dashboard Summary */}
      <section className="section-padding-100" style={{
    backgroundColor: "#1f2937",
    borderRadius: "15px",
  }}>
        <div className="container" >

          <div className="row text-center">

            <div className="col-md-3 mb-4">
              <div className="card shadow border-0 p-4">
                <h2>25</h2>
                <h5>Available Rooms</h5>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow border-0 p-4">
                <h2>5</h2>
                <h5>My Bookings</h5>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow border-0 p-4">
                <h2>2</h2>
                <h5>Pending Bookings</h5>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow border-0 p-4">
                <h2>₹15,000</h2>
                <h5>Total Payments</h5>
              </div>
            </div>

          </div>
        </div>
      </section>
            {/* Featured Rooms */}
      <section className="rooms-area section-padding-100-0"  style={{ backgroundColor: "#f8f5f0" }}>
        <div className="container">

          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-heading text-center">
                <h2>Featured Rooms</h2>
                <p>
                  Choose from our most popular and comfortable rooms.
                </p>
              </div>
            </div>
          </div>

          <div className="row">

            {/* Room 1 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow border-0">

                <img
                  src="/img/bg-img/1.jpg"
                  className="card-img-top"
                  alt=""
                />

                <div className="card-body">

                  <h4>Deluxe Room</h4>

                  <p>
                    Spacious deluxe room with king-size bed,
                    free Wi-Fi and breakfast.
                  </p>

                  <h5 className="text-primary">
                    ₹2500 / Night
                  </h5>

                  <Link
                    to="/customer/book-room"
                    className="btn palatin-btn w-100 mt-3"
                  >
                    Book Now
                  </Link>

                </div>
              </div>
            </div>

            {/* Room 2 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow border-0">

                <img
                  src="/img/bg-img/8.jpg"
                  className="card-img-top"
                  alt=""
                />

                <div className="card-body">

                  <h4>Double Suite</h4>

                  <p>
                    Perfect for couples with luxury furniture
                    and balcony view.
                  </p>

                  <h5 className="text-primary">
                    ₹3500 / Night
                  </h5>

                  <Link
                    to="/customer/book-room"
                    className="btn palatin-btn w-100 mt-3"
                  >
                    Book Now
                  </Link>

                </div>
              </div>
            </div>

            {/* Room 3 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow border-0">

                <img
                  src="/img/bg-img/9.jpg"
                  className="card-img-top"
                  alt=""
                />

                <div className="card-body">

                  <h4>Single Room</h4>

                  <p>
                    Affordable room with modern facilities
                    for solo travellers.
                  </p>

                  <h5 className="text-primary">
                    ₹1800 / Night
                  </h5>

                  <Link
                    to="/customer/book-room"
                    className="btn palatin-btn w-100 mt-3"
                  >
                    Book Now
                  </Link>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Hotel Services */}

      <section className="section-padding-100 "  style={{ backgroundColor: "dark" }}>

        <div className="container">

          <div className="section-heading text-center mb-5">
            <h2>Our Hotel Services</h2>
            <p>
              We provide world-class facilities for all guests.
            </p>
          </div>

          <div className="row">

            <div className="col-md-3 mb-4">
              <div className="card text-center shadow border-0 p-4">
                <h1>🍽</h1>
                <h5>Restaurant</h5>
                <p>Fresh & Delicious Food</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card text-center shadow border-0 p-4">
                <h1>🏊</h1>
                <h5>Swimming Pool</h5>
                <p>Luxury Pool Area</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card text-center shadow border-0 p-4">
                <h1>🚗</h1>
                <h5>Parking</h5>
                <p>Free Secure Parking</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card text-center shadow border-0 p-4">
                <h1>🛎</h1>
                <h5>Room Service</h5>
                <p>24 × 7 Available</p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Latest Offers */}

      <section className="section-padding-100"  style={{ backgroundColor: "#eee8e3" }}>

        <div className="container">

          <div className="section-heading text-center mb-5">
            <h2>Latest Offers</h2>
            <p>Enjoy our special hotel discounts.</p>
          </div>

          <div className="row">

            <div className="col-md-4 mb-4">

              <div className="card shadow border-0 text-center p-4">

                <h3>20% OFF</h3>

                <p>
                  Book Deluxe Room
                  and get 20% instant discount.
                </p>

              </div>

            </div>

            <div className="col-md-4 mb-4">

              <div className="card shadow border-0 text-center p-4">

                <h3>Free Breakfast</h3>

                <p>
                  Complimentary breakfast
                  on every luxury room booking.
                </p>

              </div>

            </div>

            <div className="col-md-4 mb-4">

              <div className="card shadow border-0 text-center p-4">

                <h3>Weekend Offer</h3>

                <p>
                  Stay 2 Nights
                  and get 1 Spa Session Free.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* Recent Bookings */}
      <section className="section-padding-100 bg-light">
        <div className="container">

          <div className="section-heading text-center mb-5">
            <h2>Recent Bookings</h2>
            <p>Your latest hotel bookings.</p>
          </div>

          <div className="table-responsive">

            <table className="table table-bordered table-hover text-center">

              <thead className="table-dark">

                <tr>
                  <th>Booking ID</th>
                  <th>Room</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>BK101</td>
                  <td>Deluxe Room</td>
                  <td>20 Jul 2026</td>
                  <td>22 Jul 2026</td>
                  <td>
                    <span className="badge bg-success">
                      Confirmed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>BK102</td>
                  <td>Double Suite</td>
                  <td>25 Jul 2026</td>
                  <td>27 Jul 2026</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>BK103</td>
                  <td>Single Room</td>
                  <td>30 Jul 2026</td>
                  <td>31 Jul 2026</td>
                  <td>
                    <span className="badge bg-danger">
                      Cancelled
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>
      </section>

      {/* Contact */}
      <section className="contact-area section-padding-100">

        <div className="container">

          <div className="row">

            <div className="col-md-6">

              <div className="section-heading">

                <h2>Contact Us</h2>

                <p>
                  We are available 24/7 to help you with your bookings
                  and hotel services.
                </p>

              </div>

              <h5>📍 Model Town, Ludhiana, Punjab</h5>

              <h5>📞 +91 98765 43210</h5>

              <h5>📧 info@hotelbooking.com</h5>

              <div className="mt-4">

                <Link
                  to="/customer/book-room"
                  className="btn palatin-btn me-3"
                >
                  Book Now
                </Link>

                <Link
                  to="/customer/browse-rooms"
                  className="btn palatin-btn"
                >
                  Browse Rooms
                </Link>

              </div>

            </div>

            <div className="col-md-6">

              <iframe
                title="Hotel Location"
                width="100%"
                height="350"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
               
              ></iframe>

            </div>

          </div>

        </div>

      </section>

     

    </>
  );
}