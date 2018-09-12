module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const unique = true;
  const required = true;

  const UserSchema = new Schema({
    name: { type: String, unique, required },
    nickName: { type: String, unique, required },
    gender: { type: Number, required },
    age: { type: Number, default: 18 },
    phone: { type: String, unique, required },
    pwd: { type: String, required },
    address: String,
    avatar: String,
  });

  return mongoose.model('User', UserSchema, 'user');
};
