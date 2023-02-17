import "./App.css";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import Insurances from "./pages/insurances/Insurances";
import InsuranceDetails from "./pages/insurances/InsuranceDetails";
import MyInsurances from "./pages/insurances/MyInsurances";
import Faq from "./pages/faq/Faq";
import AuthenticationGuard from "./components/guard/AuthenticationGuard";

function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/insurances" element={<Insurances/>}/>
          <Route path="/insurances-details/:id" element={<InsuranceDetails/>}/>
          <Route path="/my-insurances" element={<AuthenticationGuard component={MyInsurances}></AuthenticationGuard>}/>
          <Route path="/faq" element={<Faq/>}/>
          <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
