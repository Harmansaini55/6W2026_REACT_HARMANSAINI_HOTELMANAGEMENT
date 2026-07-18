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

class CustomerService {

  // Get All Customers
  async getAllCustomers() {

    const snapshot = await getDocs(collection(db, dbPath));

    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

  }

  // Add Customer
  async addCustomer(customer) {

    const docRef = await addDoc(
      collection(db, dbPath),
      customer
    );

    return docRef.id;

  }

  // Update Customer
  async updateCustomer(updatedCustomer) {

    const customerRef = doc(
      db,
      dbPath,
      updatedCustomer.id
    );

    const customerData = { ...updatedCustomer };

    delete customerData.id;

    await updateDoc(
      customerRef,
      customerData
    );

  }

  // Delete Customer
  async deleteCustomer(id) {

    await deleteDoc(
      doc(db, dbPath, id)
    );

  }

  // Get Customer By Id
  async getCustomerById(id) {

    const customerDoc = await getDoc(
      doc(db, dbPath, id)
    );

    if (!customerDoc.exists()) {
      return null;
    }

    return {
      id: customerDoc.id,
      ...customerDoc.data(),
    };

  }

}

export default new CustomerService();