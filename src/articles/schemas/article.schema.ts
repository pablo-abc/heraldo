import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ArticleSchema = new Schema({
    title: String,
    date: { type: Date, default: Date.now },
    text: String,
    user: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});
