import Listing from '../models/listing.model.js';

export const test = (req, res) => {
  res.json({
    message: "API Route is Working",
  });
};
/*
test: Bu işlev, /test yoluna gelen HTTP GET isteği üzerine çalışır. İsteğe 
yanıt olarak bir JSON nesnesi gönderir 
ve bu nesnenin içeriği "API Route is Working" mesajını içerir. 
Bu, API'nizin çalışıp çalışmadığını test etmek için basit bir yol sağlar.
*/

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


// export const answerListing = async (req, res, next) => {
//   try {
//     const listingId = req.params.id;
//     const newAnswer = req.body.answer;

//     const listing = await Listing.findById(listingId);

//     if (!listing) {
//       return next(errorHandler(404, "Listing not found!"));
//     }

//     // Append the new answer to the answers array
//     listing.answers.push(newAnswer);

//     // Save the updated listing
//     const updatedListing = await listing.save();
//     console.log(newAnswer);

//     res.status(200).json(updatedListing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAnswers = async (listingId) => {
//   try {
//     const listing = await Listing.findById(listingId);

//     if (!listing) {
//       throw errorHandler(404, "Listing not found!");
//     }

//     const answers = listing.answers;

//     return answers;
//   } catch (error) {
//     throw error;
//   }
// };
/*
getUserListings: Bu işlev, /listings/:id yoluna gelen HTTP GET isteği üzerine çalışır. 
İsteği işlerken, önce gelen isteğin req.params.id değerini alır. Daha sonra bu id değeri 
ile kullanıcının kendi listelerini bulur. Eğer istemci, req.params.id değerini kendi 
kimliği ile (örneğin, kullanıcı kimliği) uyuştuğu takdirde, bu kullanıcının listelerini 
veritabanından çeker ve 200 HTTP durum kodu ile birlikte bu listeleri JSON formatında 
yanıt olarak gönderir. Eğer kullanıcı kimliği uyuşmazsa 
(yani, başkasının listelerini almaya çalışırsa), 
bir hata mesajı döndürür ve HTTP 401 (Unauthorized) 
durum kodu ile birlikte "You can only view your own listings!" mesajını döndürür.
*/