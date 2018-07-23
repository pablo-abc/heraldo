import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
    title: String,
    date: Date,
    text: String,
    userId: String,
});
