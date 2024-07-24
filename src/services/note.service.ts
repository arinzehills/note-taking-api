// const db = require('../services/firebaseservice');

import admin from "./firebaseservice";
const db = admin.firestore();


const addNote = async (userId: string, title: string, content: string,): Promise<string> => {
    const noteRef = await db.collection('notes').add({
      userId,
      title,
      content,
      sharedWith: [],
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return noteRef.id;
  };
  
  const editNote = async (noteId: string,title: string, content: string): Promise<void> => {
    const noteRef = db.collection('notes').doc(noteId);
    const noteSnapshot = await noteRef.get();
  
    if (noteSnapshot.exists) {
      const noteData = noteSnapshot.data();
      await noteRef.collection('versions').add({
        title:noteData.title,
        content: noteData.content,
        updatedAt: noteData.updatedAt,
        versionCreatedAt: new Date()
      });

     return await noteRef.update({
        title,
        content,
        updatedAt: new Date()
      });
    } else {
      throw new Error('Note not found');
    }
  };
  
  const deleteNote = async (noteId: string): Promise<void> => {
    await db.collection('notes').doc(noteId).delete();
  };
  
  const getNote = async (noteId: string): Promise<any> => {
    const noteRef = db.collection('notes').doc(noteId);
    const noteSnapshot = await noteRef.get();
  
    if (noteSnapshot.exists) {
      return { id: noteSnapshot.id, ...noteSnapshot.data() };
    } else {
      throw new Error('Note not found');
    }
  };
  
  const getNoteVersions = async (noteId: string): Promise<any[]> => {
    const versionsRef = db.collection('notes').doc(noteId).collection('versions');
    const versionsSnapshot = await versionsRef.orderBy('versionCreatedAt', 'desc').get();
    const versions: any[]  = [];
    versionsSnapshot.forEach((doc:any) => {
      versions.push({ id: doc.id, ...doc.data() });
    });
  
    return versions;
  };
  
  const revertToVersion = async (noteId: string, versionId: string): Promise<void> => {
    const versionRef = db.collection('notes').doc(noteId).collection('versions').doc(versionId);
    const versionSnapshot = await versionRef.get();
  
    if (versionSnapshot.exists) {
      const versionData = versionSnapshot.data();
      await db.collection('notes').doc(noteId).update({
        title:versionData.title,
        content: versionData.content,
        updatedAt: new Date()
      });
    } else {
      throw new Error('Version not found');
    }
  };
  
  const shareNote = async (noteId: string, email: string): Promise<void> => {
    console.log("ABEH U DEY REACH CHERE",email)
    const noteRef = db.collection('notes').doc(noteId);
    await noteRef.update({
      sharedWith: admin.firestore.FieldValue.arrayUnion(email)
    });
  };
  
  const makeNotePublic = async (noteId: string): Promise<void> => {
    const noteRef = db.collection('notes').doc(noteId);
    await noteRef.update({
      isPublic: true
    });
  };
  
  export { addNote, editNote, deleteNote, getNote, getNoteVersions, revertToVersion, shareNote, makeNotePublic };