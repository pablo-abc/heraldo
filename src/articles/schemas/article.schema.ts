import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
    title: String,
    date: { type: Date, default: Date.now },
    text: String,
    user: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});
