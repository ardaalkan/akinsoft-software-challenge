import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Signup from "./pages/SignUp/SignUp";
import Add from "./pages/Add/Add";
import All from "./pages/All/All";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRouter/PrivateRoute";
import Update from "./pages/Update/Update";
import Answer from "./pages/Answer/Answer";

// Ana uygulama bileşeni
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Özel rotaları koruma */}
        <Route element={<PrivateRoute />}>
          {/* Ana düzen bileşeni */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />  {/* Ana sayfa */}
            <Route path="/all" element={<All />} />  {/* Tüm anketler */}
            <Route path="/add" element={<Add />} />  {/* Yeni anket ekleme */}
            <Route path="/update/:id" element={<Update />} />  {/* Anket güncelleme */}
          </Route>
        </Route>
        <Route path="/:id" element={<Answer />} />  {/* Anket yanıtlama */}
        <Route path="sign-in" element={<SignIn />} />  {/* Giriş yapma sayfası */}
        <Route path="sign-up" element={<Signup />} />  {/* Kayıt olma sayfası */}
      </Routes>
    </BrowserRouter>
  );
}
