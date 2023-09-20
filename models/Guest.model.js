const { Schema, model } = require("mongoose");

const guestSchema = new Schema(
  {
    name: { type: String, required: true },
    additionalInfos: String,
    imageUrl: {type: String, required: false},
  },
  {
    timestamps: true,
  }
);

module.exports = model("Guest", guestSchema);
