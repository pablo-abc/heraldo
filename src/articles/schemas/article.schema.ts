import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ArticleSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  text: String,
  user: String,
  comments: [
    { type: Schema.Types.ObjectId, ref: 'Comment' },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
});

ArticleSchema.pre('save', function(next) {
  this.modified = new Date();
  next();
});
