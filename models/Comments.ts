import { Schema, model, models, SchemaTypes } from 'mongoose';

const commentSchema = new Schema(
  {
    doodle: {
      type: SchemaTypes.ObjectId,
      ref: 'doodle',
    },
    comment: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
);

const Comments = models.comment || model('comment', commentSchema);

export default Comments;
