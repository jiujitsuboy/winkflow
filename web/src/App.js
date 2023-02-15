import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Insurances from "./pages/Insurances";
import MyInsurances from "./pages/MyInsurances";
import Faq from "./pages/Faq";
import TermsAndContidionts from "./pages/TermsAndContidionts";

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();

  return (
    <Layout>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/insurances" element={<Insurances/>}/>
          <Route path="/my-insurances" element={<MyInsurances/>}/>
          <Route path="/faq" element={<Faq/>}/>
          <Route path="/terms-and-conditions" element={<TermsAndContidionts/>}/>
          {/* <Route path="login" element={<Login auth={{isAuth, setIsAuth}}/>} /> */}
          <Route path="*" element={<NotFound/>}/>
      </Routes>
      
    </Layout>
  );
}

export default App;
