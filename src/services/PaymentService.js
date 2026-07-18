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

const dbPath = "payments";
     class PaymentService {
  // Add Payment
  async addPayment(payment) {

    const docRef = await addDoc(
      collection(db, dbPath),
      payment
    );

    return docRef.id;

  }
  // Get All Payments
  async getAllPayments() {

    const snapshot = await getDocs(collection(db, dbPath));

    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

  }
 

  // Get Payment By ID
  async getPaymentById(id) {

    const paymentDoc = await getDoc(
      doc(db, dbPath, id)
    );

    if (!paymentDoc.exists()) {
      return null;
    }

    return {
      id: paymentDoc.id,
      ...paymentDoc.data(),
    };

  }

  // Update Payment
  async updatePayment(updatedPayment) {

    const paymentRef = doc(
      db,
      dbPath,
      updatedPayment.id
    );

    const paymentData = { ...updatedPayment };

    delete paymentData.id;

    await updateDoc(
      paymentRef,
      paymentData
    );

  }

  // Delete Payment
  async deletePayment(id) {

    await deleteDoc(
      doc(db, dbPath, id)
    );

  }

  // Update Payment Status
  async updatePaymentStatus(id, status) {

    await updateDoc(
      doc(db, dbPath, id),
      {
        paymentStatus: status,
      }
    );

  }

}

export default new PaymentService();