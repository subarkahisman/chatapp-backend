import { compare, genSalt, hash } from "bcrypt";
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

interface Methods {
  comparePassword(inputPassword: string): Promise<boolean>;
  // cekPassword(inPassword: string): Promise<Int16Array>;
}

const UserSchema = new Schema<UserDocument, {}, Methods>(
  {
    email: {
      required: [true, "Email wajib diisi"],
      type: String,
      unique: [true, "Email Sudah Terdaftar"],
      match: [/\S+@\S+\.\S+/, "Email Format is Invalid"],
    },
    name: {
      required: [true, "Nama wajib diisi"],
      type: String,
      unique: [
        true,
        "Username Sudah Terdaftar, Silakan gunakan Username yang lain",
      ],
    },
    password: {
      required: [true, "Password wajib diisi"],
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

UserSchema.methods.comparePassword = async function (inputPassword) {
  return await compare(inputPassword, this.password);
};

const User = model("User", UserSchema);

export default User;
