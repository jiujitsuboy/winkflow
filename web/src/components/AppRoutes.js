import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/Home";
import Insurances from "../pages/insurances/Insurances";
import InsuranceDetails from "../pages/insurances/InsuranceDetails";
import MyInsurances from "../pages/insurances/MyInsurances";
import Faq from "../pages/faq/Faq";
import AuthenticationGuard from "./guard/AuthenticationGuard";
import StripeCheckout from "../pages/payments/StripeCheckout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/insurances" element={<Insurances />} />
      <Route path="/insurances-details/:id" element={<AuthenticationGuard component={InsuranceDetails}></AuthenticationGuard>} />
      <Route
        path="/my-insurances"
        element={
          <AuthenticationGuard component={MyInsurances}></AuthenticationGuard>
        }
      />
      <Route
        path="/checkout-payment"
        element={
          <AuthenticationGuard component={StripeCheckout}></AuthenticationGuard>
        }
      />
      <Route path="/faq" element={<Faq />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
