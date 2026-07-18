import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FeedbackService from "../../../services/FeedbackService";

export default function Feedback() {

  const navigate = useNavigate();

  const [feedbackData, setFeedbackData] = useState({
    customerName: "",
    email: "",
    bookingId: "",
    rating: "5",
    message: "",
    feedbackDate: new Date().toLocaleDateString()
  });

  const handleChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !feedbackData.customerName ||
      !feedbackData.email ||
      !feedbackData.message
    ) {
      toast.error("Please fill all required fields");
      return;
    }

   const newFeedback = {

 ...feedbackData,

 feedbackId: Date.now().toString(),

 createdAt:new Date().toISOString()

};


await FeedbackService.addFeedback(newFeedback);

    toast.success("Feedback Submitted Successfully");

    setTimeout(() => {
      navigate("/customer");
    }, 1500);
  };

  const handleReset = () => {

    setFeedbackData({
      customerName: "",
      email: "",
      bookingId: "",
      rating: "5",
      message: "",
      feedbackDate: new Date().toISOString()
    });

  };
    return (

    <div className="container py-5">

      <div className="card shadow-lg">

        <div className="card-header bg-dark text-white">
          <h3>Submit Feedback</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Customer Name</label>

              <input
                type="text"
                className="form-control"
                name="customerName"
                value={feedbackData.customerName}
                onChange={handleChange}
                 placeholder="Enter Name"
              />
            </div>

            <div className="mb-3">
              <label>Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={feedbackData.email}
                onChange={handleChange}
                 placeholder="Enter Email"
              />
            </div>

            <div className="mb-3">
              <label>Booking ID</label>

              <input
                type="text"
                className="form-control"
                name="bookingId"
                value={feedbackData.bookingId}
                onChange={handleChange}
                 placeholder="Enter your Booking Id"
              />
            </div>

            <div className="mb-3">
              <label>Rating</label>

              <select
                className="form-select"
                name="rating"
                value={feedbackData.rating}
                onChange={handleChange}
              >
            
                <option value="5" disabled hidden>⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Very Good</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="2">⭐⭐ Fair</option>
                <option value="1">⭐ Poor</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Feedback</label>

              <textarea
                rows="5"
                className="form-control"
                name="message"
                value={feedbackData.message}
                onChange={handleChange}
                placeholder="Write your feedback..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-success me-2"
            >
              Submit Feedback
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