export default app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const unique = true;
  const required = true;

  const userSchema = new Schema({
    name: { type: String, unique, required },
    pwd: { type: String, required },
    phone: { type: String, unique },
    email: { type: String, unique },
    role: { type: String, default: 'user' },
    avatar: String,
    address: String,
    signature: String,
    title: String,
    group: String,
    tags: Array,
    notifyCount: Number,
    countryCode: Number,
    geographic: Array,
  });

  return mongoose.model('User', userSchema, 'user');
};
