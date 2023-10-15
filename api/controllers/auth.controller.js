import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import md5 from "md5";
import jwt from "jsonwebtoken";

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

/* 
json web token oluşturulur ve auth işlemlerinde kullanılır. 
verileri güvenli bir şekilde taşımak için kullanılan 
bir veri yapısıdır ve genellikle kimlik doğrulama 
ve yetkilendirme amacıyla kullanılır. JWT, JSON formatında veri depolar ve bu 
veriyi dijital olarak imzalar veya şifreler. 
*/

/*
ödevde gönderilen pdf dosyasında bonus ifadesindeki isteklere göre burada
halihazırda md5 paketi kullanılarak oluşturulmuş şifre database de şifrelenmiş 
haldedir ve şifre karşılaştırmak amacı ile tekrar burada kullanılır.
*/

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = md5(password) === validUser.password; // MD5 ile karşılaştır
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out");
  } catch (error) {
    next(error);
  }
};
