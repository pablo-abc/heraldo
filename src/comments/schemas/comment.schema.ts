import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    text: String,
    date: Date,
    user: String,
});
