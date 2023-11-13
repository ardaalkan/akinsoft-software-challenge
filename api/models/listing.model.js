import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    answers: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
  /*
  MongoDB'deki "listings" koleksiyonu için Mongoose modelini 
  tanımlar ve dışa aktarır. Model, belge yapısını, 
  zorunlu alanları ve otomatik zaman damgalarını içerir. 
  Bu model, MongoDB koleksiyonuyla etkileşimde bulunmak için kullanılır.
  */
