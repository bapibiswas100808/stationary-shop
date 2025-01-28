import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'User ID is required.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: 'Role must be either "admin" or "user".',
      },
      required: [true, 'Role is required.'],
      default: 'user',
    },
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    phone: {
      type: String,
      default: 'N/A',
    },
    address: {
      type: String,
      default: 'N/A',
    },
    city: {
      type: String,
      default: 'N/A',
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      match: [/.+@.+\..+/, 'Please provide a valid email address.'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message: 'Status must be either "active" or "blocked".',
      },
      required: [true, 'Status is required.'],
      default: 'active',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
