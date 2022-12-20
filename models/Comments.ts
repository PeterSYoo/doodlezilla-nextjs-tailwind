import { Schema, model, models, SchemaTypes } from 'mongoose';
import momentTimezone from 'moment-timezone';

const commentSchema = new Schema(
  {
    doodle: {
      type: SchemaTypes.ObjectId,
      ref: 'doodle',
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    comment: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      default: () => momentTimezone().tz('America/Los_Angeles').format(),
    },
  }
);

const Comments = models.comment || model('comment', commentSchema);

export default Comments;
