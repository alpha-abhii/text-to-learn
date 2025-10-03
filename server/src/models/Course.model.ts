import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    description: string;
    creator: string; // Auth0 sub
    modules: mongoose.Schema.Types.ObjectId[];
    tags: string[];
}

const courseSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    creator: { type: String, required: true },
    modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
    tags: [{ type: String, trim: true }]
}, { timestamps: true });

export default mongoose.model<ICourse>('Course', courseSchema);