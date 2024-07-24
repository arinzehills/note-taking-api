import { Router } from 'express';
const router = Router();
const { addNote, editNote, deleteNote,getNoteVersionsHndlr,switchToVersionHandler,makeNotePublic,shareNoteHndlr, } = require('../controllers/note.contoller');
// const authenticate = require('../middlewares/authMiddleware');


// router.post('/note', authenticate, addNote);
// router.put('/note/:id', authenticate, editNote);
// router.delete('/note/:id', authenticate, deleteNote);

router.get('/note', addNote);
router.post('/note', addNote);
router.put('/note/:id', editNote);
router.post('/note/delete/:id', deleteNote);
router.post('/note/make-public/:id', makeNotePublic);
router.get('/get-note-versions/:id', getNoteVersionsHndlr);
router.post('/switch-note-version', switchToVersionHandler);
router.post('/note/share-note', shareNoteHndlr);

module.exports = router;