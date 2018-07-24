import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
    text: String,
    date: Date,
    user: String,
});
