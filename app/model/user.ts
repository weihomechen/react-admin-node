export default app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const unique = true;
  const required = true;

  const userSchema = new Schema({
    name: { type: String, unique, required },
    pwd: { type: String, required },
    mobile: { type: String, unique, required },
    role: { type: String, default: 'user' },
    avatar: String,
    address: String,
    signature: String,
    title: String,
    group: String,
    tags: Array,
    countryCode: Number,
    geographic: Array,
  });

  return mongoose.model('User', userSchema, 'user');
};
