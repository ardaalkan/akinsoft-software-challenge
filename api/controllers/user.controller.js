import Listing from '../models/listing.model.js';

export const test = (req, res) => {
  res.json({
    message: "API Route is Working",
  });
};

export const getUserListings = async (req, res, next) => {
  
  if (req.id === req.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};