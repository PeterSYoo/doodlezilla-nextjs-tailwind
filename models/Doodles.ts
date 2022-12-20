import { Schema, model, models, SchemaTypes } from 'mongoose';
import momentTimezone from 'moment-timezone';

const doodleSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    image: String,
    likes: {
      type: Number,
      default: 0,
    },
    likesTrueFalse: {
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

const Doodles = models.doodle || model('doodle', doodleSchema);

export default Doodles;
