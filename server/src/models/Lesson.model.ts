import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson extends Document {
    title: string;
    content: mongoose.Schema.Types.Mixed[];
    isEnriched: boolean;
    module: mongoose.Schema.Types.ObjectId;
}

const lessonSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: [mongoose.Schema.Types.Mixed], required: true },
    isEnriched: { type: Boolean, default: false },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true }
}, { timestamps: true });

export default mongoose.model<ILesson>('Lesson', lessonSchema);