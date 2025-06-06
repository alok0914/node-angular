import express from 'express';
import NotesController from '../controllers/notes.ctrl';


const router = express.Router();

// Public routes
router.get('/', NotesController.getNotes);
//router.get('/:id', NotesController.getProductById);

// Protected admin routes
router.post('/', NotesController.createNote);
router.put('/:id', NotesController.updateNote);
router.delete('/:id',  NotesController.deleteNote);

export default router;