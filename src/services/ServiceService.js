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

const dbPath = "services";

class ServiceService {

  // Get All Services
  async getAllServices() {

    const snapshot = await getDocs(collection(db, dbPath));

    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

  }

  // Add New Service
  async addService(service) {

    const docRef = await addDoc(
      collection(db, dbPath),
      service
    );

    return docRef.id;

  }

  // Get Service By ID
  async getServiceById(id) {

    const serviceDoc = await getDoc(
      doc(db, dbPath, id)
    );

    if (!serviceDoc.exists()) {
      return null;
    }

    return {
      id: serviceDoc.id,
      ...serviceDoc.data(),
    };

  }

  // Update Service
  async updateService(updatedService) {

    const serviceRef = doc(
      db,
      dbPath,
      updatedService.id
    );

    const serviceData = { ...updatedService };

    delete serviceData.id;

    await updateDoc(
      serviceRef,
      serviceData
    );

  }

  // Delete Service
  async deleteService(id) {

    await deleteDoc(
      doc(db, dbPath, id)
    );

  }

}

export default new ServiceService();