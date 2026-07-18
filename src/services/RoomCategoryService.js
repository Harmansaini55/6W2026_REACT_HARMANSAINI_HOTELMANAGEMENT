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

const dbPath = "roomCategories";

class RoomCategoryService {

  // Get All Categories
  async getCategories() {

    const snapshot = await getDocs(collection(db, dbPath));

    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

  }

  // Get Category By Id
  async getCategoryById(id) {

    const categoryDoc = await getDoc(
      doc(db, dbPath, id)
    );

    if (!categoryDoc.exists()) {
      return null;
    }

    return {
      id: categoryDoc.id,
      ...categoryDoc.data(),
    };

  }

  // Add Category
  async addCategory(categoryData) {

    const docRef = await addDoc(
      collection(db, dbPath),
      categoryData
    );

    return docRef.id;

  }

  // Update Category
  async updateCategory(id, categoryData) {

    await updateDoc(
      doc(db, dbPath, id),
      categoryData
    );

  }

  // Delete Category
  async deleteCategory(id) {

    await deleteDoc(
      doc(db, dbPath, id)
    );

  }

}

export default new RoomCategoryService();