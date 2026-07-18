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
import StaffModel from "../models/StaffModel";

const dbPath = "staff";

class StaffService {

  // Get All Staff
  async getAllStaff() {

    const snapshot = await getDocs(collection(db, dbPath));

    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

  }

  // Add Staff
  async addStaff(staffData) {

    const newStaff = new StaffModel(
      staffData.id,
      staffData.image,
      staffData.name,
      staffData.gender,
      staffData.phone,
      staffData.email,
      staffData.address,
      staffData.department,
      staffData.designation,
      staffData.joiningDate,
      staffData.salary,
      staffData.shift,
      staffData.status
    );

    const staff = { ...newStaff };

    delete staff.id;

    const docRef = await addDoc(
      collection(db, dbPath),
      staff
    );

    return docRef.id;

  }

  // Get Staff By Id
  async getStaffById(id) {

    const staffDoc = await getDoc(
      doc(db, dbPath, id)
    );

    if (!staffDoc.exists()) {
      return null;
    }

    return {
      id: staffDoc.id,
      ...staffDoc.data(),
    };

  }

  // Update Staff
  async updateStaff(updatedStaff) {

    const staffRef = doc(
      db,
      dbPath,
      updatedStaff.id
    );

    const staffData = { ...updatedStaff };

    delete staffData.id;

    await updateDoc(
      staffRef,
      staffData
    );

  }

  // Delete Staff
  async deleteStaff(id) {

    await deleteDoc(
      doc(db, dbPath, id)
    );

  }

}

export default new StaffService();