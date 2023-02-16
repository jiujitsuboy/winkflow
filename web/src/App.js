import "./App.css";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Insurances from "./pages/Insurances";
import MyInsurances from "./pages/MyInsurances";
import Faq from "./pages/Faq";
import TermsAndContidionts from "./pages/TermsAndContidionts";
import AuthenticationGuard from "./components/guard/AuthenticationGuard";

function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/insurances" element={<Insurances/>}/>
          <Route path="/my-insurances" element={<AuthenticationGuard component={MyInsurances}></AuthenticationGuard>}/>
          <Route path="/faq" element={<Faq/>}/>
          <Route path="/terms-and-conditions" element={<TermsAndContidionts/>}/>
          <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
