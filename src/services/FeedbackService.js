import {
 collection,
 addDoc,
 getDocs,
 deleteDoc,
 doc
} from "firebase/firestore";

import { db } from "../firebase/FirebaseConfig";


const dbPath="feedbacks";


class FeedbackService{


async addFeedback(feedback){

 const docRef = await addDoc(
  collection(db,dbPath),
  feedback
 );

 return docRef.id;

}


async getAllFeedbacks(){

 const snapshot =
 await getDocs(collection(db,dbPath));

 return snapshot.docs.map(item=>({
   id:item.id,
   ...item.data()
 }));

}


async deleteFeedback(id){

 await deleteDoc(
  doc(db,dbPath,id)
 );

}


}


export default new FeedbackService();