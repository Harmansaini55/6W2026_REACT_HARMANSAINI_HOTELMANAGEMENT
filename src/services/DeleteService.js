import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/FirebaseConfig";

class DeleteService {

  async deleteCollection(collectionName) {

    const snapshot = await getDocs(
      collection(db, collectionName)
    );

    console.log(collectionName, snapshot.size);

    for (const item of snapshot.docs) {

      console.log("Deleting:", item.id);

      await deleteDoc(
        doc(db, collectionName, item.id)
      );

    }

  }

  async deleteAllData() {


    await this.deleteCollection("rooms");
    await this.deleteCollection("customers");
    await this.deleteCollection("bookings");
    await this.deleteCollection("payments");
    await this.deleteCollection("services");
    await this.deleteCollection("staff");
    await this.deleteCollection("offers");
    await this.deleteCollection("feedback");
   

  }

}

export default new DeleteService();