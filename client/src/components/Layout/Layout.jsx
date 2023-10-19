import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

// Layout bileşeni, sayfanın üstbilgisi (Header), sol kenar çubuğu (Sidebar),
// sayfa içeriği (Outlet) ve altbilgisi (Footer) gibi bileşenleri içerir.

export default function Layout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
}
