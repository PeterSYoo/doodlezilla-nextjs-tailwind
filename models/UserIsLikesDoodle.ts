import { Schema, model, models, SchemaTypes } from 'mongoose';

const userIsLikesDoodleSchema = new Schema({
  doodle: {
    type: SchemaTypes.ObjectId,
    ref: 'doodle',
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
  isLikes: {
    type: Boolean,
    default: false,
  },
});

const UserIsLikesDoodle =
  models.userIsLikesDoodle ||
  model('userIsLikesDoodle', userIsLikesDoodleSchema);

export default UserIsLikesDoodle;
