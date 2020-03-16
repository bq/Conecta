import { Document, model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dni: {
    type: String,
    required: true
  },
  isVolunteer: Boolean,
  name: String,
  phone: String,
  availability: {
    L: [Number],
    M: [Number],
    X: [Number],
    J: [Number],
    V: [Number],
    S: [Number],
    D: [Number]
  },
  services: {
    childCare: Boolean,
    shopping: Boolean,
    pharmacy: Boolean,
    laundry: Boolean,
    call: Boolean,
    other: Boolean,
    otherText: String
  }
});

export const UserModel = models.User || model("User", UserSchema);
