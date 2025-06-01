import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
  },
  bio: {
    type: String,
    maxLength: 200,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  createdAt: {
    type: Date,
    deafult: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
