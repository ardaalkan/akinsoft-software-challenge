import mongoose from "mongoose";

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
    answers: {
      type: [String],
      default: [],
    },
    questions: {
      type: [String],
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
