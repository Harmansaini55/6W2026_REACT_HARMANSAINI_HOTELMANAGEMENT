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
import OfferModel from "../models/OfferModel";

const dbPath = "offers";

class OfferService {

  // Get All Offers
  async getAllOffers() {

    const snapshot = await getDocs(collection(db, dbPath));

    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

  }

  // Add Offer
  async addOffer(offerData) {

    const newOffer = new OfferModel(
      offerData.id,
      offerData.offerName,
      offerData.offerType,
      offerData.discount,
      offerData.validFrom,
      offerData.validTo,
      offerData.description,
      offerData.status
    );

    const offer = { ...newOffer };

    delete offer.id;

    const docRef = await addDoc(
      collection(db, dbPath),
      offer
    );

    return docRef.id;

  }

  // Get Offer By Id
  async getOfferById(id) {

    const offerDoc = await getDoc(
      doc(db, dbPath, id)
    );

    if (!offerDoc.exists()) {
      return null;
    }

    return {
      id: offerDoc.id,
      ...offerDoc.data(),
    };

  }

  // Update Offer
  async updateOffer(updatedOffer) {

    const offerRef = doc(
      db,
      dbPath,
      updatedOffer.id
    );

    const offerData = { ...updatedOffer };

    delete offerData.id;

    await updateDoc(
      offerRef,
      offerData
    );

  }

  // Delete Offer
  async deleteOffer(id) {

    await deleteDoc(
      doc(db, dbPath, id)
    );

  }

}

export default new OfferService();