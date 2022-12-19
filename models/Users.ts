import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  image: String,
  password: String,
  biography: String,
  location: String,
});

const Users = models.user || model('user', userSchema);

export default Users;
