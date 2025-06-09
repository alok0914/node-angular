"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_ctrl_1 = __importDefault(require("../controllers/notes.ctrl"));
const router = express_1.default.Router();
// Public routes
router.get('/', notes_ctrl_1.default.getNotes);
//router.get('/:id', NotesController.getProductById);
// Protected admin routes
router.post('/', notes_ctrl_1.default.createNote);
router.put('/:id', notes_ctrl_1.default.updateNote);
router.delete('/:id', notes_ctrl_1.default.deleteNote);
exports.default = router;
