import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // "react-redux" kullanmalısınız, "react" değil

export default function PrivateRoute() {
  const currentUser = useSelector((state) => state.user.currentUser); // state.user.currentUser olarak değiştirin
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
