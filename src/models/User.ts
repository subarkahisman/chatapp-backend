import { genSalt, hash } from "bcrypt";
import { Document, model, Schema } from "mongoose";

interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  token: string;
  avatar?: {
    url: string;
    id: string;
  };
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      required: true,
      type: String,
      unique: [true, "Email Sudah Terdaftar"],
    },
    name: {
      required: true,
      type: String,
      unique: [
        true,
        "Username Sudah Terdaftar, Silakan gunakan Username yang lain",
      ],
    },
    password: {
      required: true,
      type: String,
      min: [6, "Password minimal 6 karakter"],
    },
    token: {
      type: String,
    },
    avatar: {
      type: Object,
      url: String,
      id: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }
  next();
});

const User = model("User", UserSchema);

export default User;
