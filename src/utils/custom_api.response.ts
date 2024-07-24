import express, { Request, Response,NextFunction } from "express";
// utils/response.js

const successResponse = (res:Response, message:string, data = {}) => {
    return res.json({
      success: true,
      message,
      data:data
    });
  };
  
  const errorResponse = (res:Response, statusCode:number, message:string, data = {}) => {
    return res.status(statusCode).json({
      success: false,
      message,
      data:data
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse
  };
  