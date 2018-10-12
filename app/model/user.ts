export default app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const unique = true;
  const required = true;

  const userSchema = new Schema({
    name: { type: String, unique, required },
    pwd: { type: String, required },
    mobile: { type: String, unique, required },
    countryCode: { type: String, default: '86' },
    role: { type: String, default: 'user', enum: ['user', 'admin', 'guest'] },
    email: String,
    avatar: String,
    geographic: Schema.Types.Mixed,
    address: String,
    signature: String,
    title: String,
    group: String,
    tags: { type: Array, default: [] },
  });

  return mongoose.model('User', userSchema, 'user');
};
