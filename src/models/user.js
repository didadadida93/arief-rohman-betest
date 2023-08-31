import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'User name is required!'],
  },
  accountNumber: {
    type: String,
    required: [true, 'Account number is required!'],
    validate: {
      validator: async function(accountNumber) {
        const res = await mongoose.models.User.findOne({ accountNumber })
          .exec();
        return res ? false : true;
      },
      message: 'Account number has been registered',
    },
  },
  emailAddress: {
    type: String,
    required: [true, 'Email address is required!'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email format'
    ],
  },
  identityNumber: {
    type: String,
    required: [true, 'Identity number is required!'],
    validate: {
      validator: async function(identityNumber) {
        const res = await mongoose.models.User.findOne({ identityNumber })
          .exec();
        return res ? false : true;
      },
      message: 'Identity number has been registered',
    },
  }
}, {
  methods: {
    transform() {
      const obj = this.toObject();
      obj.id = obj._id;
      delete obj._id;
      delete obj.__v;
      return obj;
    }
  },
});

export const UserModel = mongoose.model('User', UserSchema);
