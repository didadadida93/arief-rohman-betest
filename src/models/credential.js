import mongoose, { Schema } from 'mongoose';

const CredentialSchema = new Schema({
  credname: {
    type: String,
    required: [true, 'Username is required'],
    validate: {
      validator: async function(credname) {
        const cred = await mongoose.models.Credential.findOne({ credname })
          .exec();
        return cred ? false : true;
      },
      message: 'Username has been registered',
    },
  },
});

export const CredentialModel = mongoose.model('Credential', CredentialSchema);
