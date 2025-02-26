import React from "react";
import { Route, Routes } from "react-router-dom";
import VehicleIDVForm from "./task-pages/VehicleIDVForm.jsx";
import InsuranceForm from "./task-pages/InsuranceForm.jsx";
import PagenotFound from "./task-pages/PagenotFound.jsx";
import Policy from "./task-pages/Policy.jsx";
import Premium from "./task-pages/premium.jsx";
import { FormProvider } from "./task-pages/FormContext.jsx";
import PolicyDetail from "./task-pages/PolicyDetail.jsx";
import PolicyDetailHis from "./task-pages/PolicyDetailHis.jsx";
import Home from "./task-pages/Home.jsx";
import Insight from "./task-pages/Insight.jsx";
import PrivateRoute from "./task-pages/Sign/PrivateRoute.jsx";
import PublicRoute from "./task-pages/Sign/PublicRoute.jsx";
import Land from "./task-pages/land.jsx";
import Login from "./task-pages/Login.jsx";

function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Land />} />

        {/* Public Route */}
        <Route element={<PublicRoute />}>
          <Route path="/sign" element={<Login />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<InsuranceForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vehicle" element={<VehicleIDVForm />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/gen" element={<PolicyDetail />} />
          <Route path="/history" element={<PolicyDetailHis />} />
          <Route path="/insig" element={<Insight />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </FormProvider>
  );
}

export default App;