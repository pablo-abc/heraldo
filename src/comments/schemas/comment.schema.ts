import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CommentSchema = new Schema({
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  text: String,
  date: Date,
  user: String,
});
