import User from "../models/user.model.js";
import md5 from "md5";

/*
md5 şifreleme paketi ile birlikte kullanıcının gireceği şifre artık belirli bir
algoritmaya bağlı kalarak şifrelenecek ve şifre veritabanına yani mongodb'ye şifrelenmiş
bir şekilde gönderilecek ve veritabanında şifrelenmiş şekilde görüntülenecek.
*/

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = md5(password);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created succesfully!");
  } catch (error) {
    next(error);
    // res.status(500).json(error.message);
  }
};
