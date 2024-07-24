import { request } from "http"
require('dotenv').config();

const admin=require("firebase-admin")
const serviceAccount=require("../../serviceAccountKey1.json") 

admin.initializeApp({
    // credentials:admin.credential.cert(serviceAccount),
    credential: admin.credential.applicationDefault(),
    projectId:'note-taking-bb8c5'
})

export default admin