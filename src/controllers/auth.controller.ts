import express, { Request, Response,NextFunction, } from "express";
import { User } from "../models/user.model";
import admin from "../services/firebaseservice";
const authService = require("../services/auth.service");
const { successResponse, errorResponse } = require('../utils/custom_api.response');
const { getAuth, signInWithEmailAndPassword } = require('firebase-admin/auth');


const login = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const {idToken}=req.body
        if(!idToken) throw new Error("Please Provide Token from frontend auth")
            const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('User signed in:', decodedToken);
        // const userRes =await authService.loginService(email,password);
        return  successResponse(res, 'Login was successful', decodedToken);
    } catch (error:any) {
        return  errorResponse(res,404, error.message, );
    }
    
}

const register = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const {email,password,displayName,bio}=req.body
        if(!email || !password || !displayName) throw new Error("No email,displayName, or password provided")
            const userRes =await authService.registerService(req.body);
        return  successResponse(res, 'Registration was successful', userRes);
    } catch (error:any) {
        console.log("REGIStER Hitterd",error.message)
        // next(error)
        return  errorResponse(res,404, error.message, );

    }
}
const logout = (req: Request, res: Response) => {}
const getUsers = async (req: Request, res: Response) => {
    try {
            const userRes =await authService.getUsersService();
        return  successResponse(res, 'Retrieval was successful', userRes);
    } catch (error:any) {
        return  errorResponse(res,404, error.message, );

    }
}
module.exports = { login, register,logout,getUsers };


