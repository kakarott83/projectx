import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDocs, deleteDoc, updateDoc, collectionData, getDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private fs: Firestore) { }

  /* User Data */
  addUserData(collectionName: string, docId: string, data: any): Promise<any> {
    const docRef = doc(this.fs, `${collectionName}/${docId}`);
    return setDoc(docRef, data);
  }

  getUserData(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.fs, collectionName);
    return collectionData(collectionRef, {idField: 'id'});
  }

  // Ein einzelnes Dokument einmalig abrufen
  getUserDataByIdOnce(collectionName: string, docId: string): Promise<any> {
    const docRef = doc(this.fs, `${collectionName}/${docId}`);
    return getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.data();
      } else {
        throw new Error('Document does not exist');
      }
    });
  }

  // Ein einzelnes Dokument reaktiv abrufen
  getDocumentByIdRealtime(collectionName: string, docId: string): Observable<any> {
    const docRef = doc(this.fs, `${collectionName}/${docId}`);
    return docData(docRef, { idField: 'id' }); // Fügt die ID automatisch hinzu
  }

  // Dokument aktualisieren
  updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    const docRef = doc(this.fs, `${collectionName}/${docId}`);
    return updateDoc(docRef, data);
  }

  // Dokument löschen
  deleteDocument(collectionName: string, docId: string): Promise<void> {
    const docRef = doc(this.fs, `${collectionName}/${docId}`);
    return deleteDoc(docRef);
  }


  /* User Data End */
}
