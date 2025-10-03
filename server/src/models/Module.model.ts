import mongoose, { Schema, Document } from 'mongoose';

export interface IModule extends Document {
    title: string;
    course: mongoose.Schema.Types.ObjectId;
    lessons: mongoose.Schema.Types.ObjectId[];
}

const moduleSchema: Schema = new Schema({
    title: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }]
}, { timestamps: true });

export default mongoose.model<IModule>('Module', moduleSchema);
    