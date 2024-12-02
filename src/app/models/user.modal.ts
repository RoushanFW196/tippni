import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifycodeExpiry: Date;
  isVerified: Boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now()},
});

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    trim: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please use Valid Email",
    ],
  },
  password: { type: String, required: true },
  verifyCode: {
    type: String,
    required: [true, "Verification Code is required"],
  },

  verifycodeExpiry: {
    type: Date,
    required: [true, "Verification Code Expiry is required"],
  },

  isVerified: { type: Boolean, default: false },
  isAcceptingMessage: { type: Boolean, default: true },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);


export default User;