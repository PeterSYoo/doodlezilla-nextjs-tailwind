import { Schema, model, models, SchemaTypes } from 'mongoose';
import momentTimezone from 'moment-timezone';

const likeNumSchema = new Schema(
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
      type: Number,
      default: 1,
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

const LikesNum = models.likeNum || model('likeNum', likeNumSchema);

export default LikesNum;
