import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const VoteSchema = new Schema({
  articleId: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vote: {
    type: Number,
    required: true,
    default: 1,
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

VoteSchema.pre('save', function(next) {
  if (this.vote !== -1 && this.vote !== 1)
    return next({ statusCode: 422, message: 'Votes has to be 1 or -1' });
  this.modified = new Date();
  next();
});
