import { Request, Response,NextFunction } from "express";
const { successResponse, errorResponse } = require('../utils/custom_api.response');

const noteService = require('../services/note.service');

const getNote = async (req:Request, res:Response) => {

}
  const addNote = async (req:Request, res:Response,next:NextFunction) => {
  try {
    const { content,email, title} = req.body;
console.log(email,content)
    if (!email || !content) {
    return errorResponse(res,400,'Missing userId or content');
    }
    const noteId = await noteService.addNote(email,title,content);
    return  successResponse(res, 'Node added successfully', noteId);

  } catch (error:any) {
    next(error)
    // return  errorResponse(res,404, error.message, );
  }
};

const editNote = async (req:Request, res:Response) => {
  try {
    const { title,content } = req.body;
    if (!content) {
      res.status(400).send('Missing content');
      return;
    }
    const editedNote=await noteService.editNote(req.params.id, title,content);
    return  successResponse(res, 'Note updated successfully', editedNote);

  } catch (error:any) {
    res.status(400).send(error.message);
    return  errorResponse(res,404, error.message, );
  }
};

const deleteNote = async (req:Request, res:Response) => {
  try {
    await noteService.deleteNote(req.params.id);
    return  successResponse(res, 'Note delete successfully', );
  } catch (error:any) {
    return  errorResponse(res,404, error.message, );
  }
};
const getNoteVersionsHndlr = async (req:Request, res:Response) => {
  try {
    const {id}=req.params
    if (!id) {
      return errorResponse(res,400,'Missing id for note');
      }
   var nodeV= await noteService.getNoteVersions(id);
    return  successResponse(res, 'Note versions', nodeV);
  } catch (error:any) {
    return  errorResponse(res,404, error.message, );
  }
}
const switchToVersionHandler = async (req:Request, res:Response) => {
  try {
    const {noteId,versionId}=req.body
    console.log("siwth hitted not",noteId,versionId)
    if (!noteId||!versionId) {
      return errorResponse(res,400,'Missing noteId and/or versionID for note');
      }
   var nodeV= await noteService.revertToVersion(noteId,versionId);
    return  successResponse(res, 'Note versions', nodeV);
  } catch (error:any) {
    return  errorResponse(res,404, error.message, );
  }
}
  const shareNoteHndlr = async (req:Request, res:Response) => {
  try {
    const {noteId,email}=req.body
    if (!noteId || !email) {
      return errorResponse(res,400,'Missing email or noteID');
      }
    await noteService.shareNote(noteId,email);
    return  successResponse(res, 'Note shared to user  ', );
  } catch (error:any) {
    return  errorResponse(res,404, error.message, );
  }
};
const makeNotePublic = async (req:Request, res:Response) => {
  try {
    await noteService.makeNotePublic(req.params.id);
    return  successResponse(res, 'Note made public', );
  } catch (error:any) {
    return  errorResponse(res,404, error.message, );
  }
};

module.exports = { addNote, editNote, deleteNote,getNoteVersionsHndlr,switchToVersionHandler ,makeNotePublic,shareNoteHndlr};
