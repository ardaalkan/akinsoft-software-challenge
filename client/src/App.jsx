import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Signup from "./pages/SignUp/SignUp";
import Add from "./pages/Add/Add";
import All from "./pages/All/All";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRouter/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/all" element={<All />}/>
            <Route path="/add" element={<Add />}/>
          </Route>
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
