"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notes_1 = __importDefault(require("../models/notes"));
const mongoose_1 = require("mongoose");
class NotesController {
    async createNote(req, res) {
        try {
            const { name, content } = req.body;
            // Validate input
            if (!name || !content) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            // Create notes
            const notes = new notes_1.default({
                name,
                content
            });
            await notes.save();
            return res.status(201).json(notes);
        }
        catch (error) {
            console.error('Error creating notes:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    async getNotes(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const filter = {};
            const notes = await notes_1.default.find(filter)
                .limit(Number(limit))
                .skip((Number(page) - 1) * Number(limit))
                .sort({ createdAt: -1 });
            const total = await notes_1.default.countDocuments(filter);
            return res.json({
                notes,
                total,
                page: Number(page),
                pages: Math.ceil(total / Number(limit)),
            });
        }
        catch (error) {
            console.error('Error fetching notes:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    //   async getProductById(req: Request, res: Response): Promise<any> {
    //     try {
    //       const { id } = req.params;
    //       if (!Types.ObjectId.isValid(id)) {
    //         return res.status(400).json({ message: 'Invalid product ID' });
    //       }
    //       const product = await Product.findById(id);
    //       if (!product) {
    //         return res.status(404).json({ message: 'Product not found' });
    //       }
    //       return res.json(product);
    //     } catch (error) {
    //       console.error('Error fetching product:', error);
    //       return res.status(500).json({ message: 'Server error' });
    //     }
    //   }
    async updateNote(req, res) {
        try {
            const { id } = req.params;
            const { name, content } = req.body;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid note ID' });
            }
            const note = await notes_1.default.findById(id);
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }
            // Update product fields
            note.name = name || note.name;
            note.content = content || note.content;
            await note.save();
            return res.json(note);
        }
        catch (error) {
            console.error('Error updating note:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    async deleteNote(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid product ID' });
            }
            const note = await notes_1.default.findByIdAndDelete(id);
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }
            return res.json({ message: 'Note deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting note:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
exports.default = new NotesController();
