import mongoose, { Document, Schema } from 'mongoose';

export interface INotes extends Document {
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    content: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<INotes>('Notes', NoteSchema);