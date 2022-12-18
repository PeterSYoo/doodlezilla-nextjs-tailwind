import { Schema, model, models, SchemaTypes } from 'mongoose';

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
  },
  {
    timestamps: true,
  }
);

const Doodles = models.doodle || model('doodle', doodleSchema);

export default Doodles;
