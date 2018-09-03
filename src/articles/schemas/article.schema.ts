import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ArticleSchema = new Schema({
  title: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
  image: String,
  votes: {
    type: Number,
    default: 0,
  },
  approved: {
    type: Boolean,
    default: false,
  },
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
