import { User } from "../models/user.model";
import admin from "./firebaseservice";

const auth = admin.auth();

const registerService = async (payload:any) => { 

    try {
        const userRes = await admin.auth().createUser({...payload})
        return userRes;
    } catch (error) {
        throw error
    }
}
const loginService = async (email:string,password:string)=> {
    try {
        const userRes = await admin.auth().getUserByEmail(email)
        return userRes;
    } catch (error) {
        throw error
    }
}
const logoutService = (longUrl:string) => {}
const getUsersService = async () => {
    const users = <any>[];
    const listUsersResult = await auth.listUsers();
    listUsersResult.users.forEach((userRecord:any) => {
      users.push({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        phoneNumber: userRecord.phoneNumber,
      });
    });
    return users;
}
module.exports = { registerService, loginService,logoutService ,getUsersService};