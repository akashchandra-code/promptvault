const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
    ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  category :{
    enum:["Marketing", "Social Media", "Coding", "Email", "Education", "Design", "Personal", "Business", "Medical","Other"],
    type:String,
    default:"other"
  },
  type:{
    enum:["public","private"],
    type:String,
    default:"public"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("prompt", promptSchema);