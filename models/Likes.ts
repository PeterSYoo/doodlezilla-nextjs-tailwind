import { Schema, model, models, SchemaTypes } from 'mongoose';
import momentTimezone from 'moment-timezone';

const likeSchema = new Schema(
  {
    doodle: {
      type: SchemaTypes.ObjectId,
      ref: 'doodle',
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    likes: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      default: () => momentTimezone().tz('America/Los_Angeles').format(),
    },
  }
);

const Likes = models.like || model('like', likeSchema);

export default Likes;
