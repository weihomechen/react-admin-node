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
    avatar: {
      type: String,
      default: 'http://admin-node.oss-cn-hangzhou.aliyuncs.com/jY8itYstfzREBNAQ2ZYbY2cZPtjB5ihR.png',
    },
    geographic: Schema.Types.Mixed,
    address: String,
    signature: String,
    title: String,
    group: String,
    tags: { type: Array, default: [] },
    status: { type: String, default: '1' },
  }, {
      timestamps: true,
    });

  return mongoose.model('User', userSchema, 'user');
};
