import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/FirebaseConfig";

const dbPath = "bookings";

class BookingService {

  // Get All Bookings
  async getAllBookings() {

    const snapshot = await getDocs(collection(db, dbPath));

    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

  }

  // Add New Booking
  async addBooking(booking) {
       console.log("FIRESTORE ADD START");

     
    const docRef = await addDoc(
      collection(db, dbPath),
      booking
    );
       console.log("FIRESTORE ADD ID:", docRef.id);
    return docRef.id;

  }

  // Get Booking By ID
  async getBookingById(id) {

    const bookingDoc = await getDoc(
      doc(db, dbPath, id)
    );

    if (!bookingDoc.exists()) {
      return null;
    }

    return {
      id: bookingDoc.id,
      ...bookingDoc.data(),
    };

  }

  // Update Booking
  async updateBooking(updatedBooking) {

    const bookingRef = doc(
      db,
      dbPath,
      updatedBooking.id
    );

    const bookingData = { ...updatedBooking };

    delete bookingData.id;

    await updateDoc(
      bookingRef,
      bookingData
    );

  }

  // Delete Booking
  async deleteBooking(id) {

    await deleteDoc(
      doc(db, dbPath, id)
    );

  }

  // Update Booking Status
  async updateStatus(id, status) {

    await updateDoc(
      doc(db, dbPath, id),
      {
        status: status,
      }
    );

  }

}

export default new BookingService();