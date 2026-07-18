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

const dbPath = "rooms";

class RoomService {

  // Get All Rooms
  async getAllRooms() {

    const snapshot = await getDocs(collection(db, dbPath));

    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

  }

  // Get Room By Id
  async getRoomById(id) {

    const roomDoc = await getDoc(
      doc(db, dbPath, id)
    );

    if (!roomDoc.exists()) {
      return null;
    }

    return {
      id: roomDoc.id,
      ...roomDoc.data(),
    };

  }

  // Add Room
  async addRoom(roomData) {

    const docRef = await addDoc(
      collection(db, dbPath),
      roomData
    );

    return docRef.id;

  }

  // Update Room
  async updateRoom(id, roomData) {

    await updateDoc(
      doc(db, dbPath, id),
      roomData
    );

  }

  // Delete Room
  async deleteRoom(id) {

    await deleteDoc(
      doc(db, dbPath, id)
    );

  }

}

export default new RoomService;