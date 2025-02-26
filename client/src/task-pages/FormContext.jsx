import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    insuredDetails: {
      name: '',
      address: '',
      mobileNumber: '',
      policyNo: ''
    },
    partnerDetails: {
      partnerName: '',
      partnerCode: '',
      partnerMobileNumber: '',
      partnerEmail: ''
    },
    vehicleDetails: {
      registrationNo: '',
      make: '',
      model: '',
      typeOfBody: '',
      ccKw: '',
      mfgYr: '',
      seatingCapacity: '',
      chassisNo: '',
      engineNo: ''
    },
    idvDetails: {
      vehicleIDV: '',
      trailer: '',
      nonElectricalAccessories: '',
      electricalAccessories: '',
      cngLpgUnit: '',
      totalIDV: ''
    },
    previousPolicyDetails: {
      previousPolicyNo: '',
      previousPolicyPeriod: '',
      previousInsurerName: '',
      previousPolicyType: '',
      previousYearNCB: '',
      claimsMadeUnderPreviousPolicy: ''
    },
    premiumBreakup: {
      basicODPremium: 1,
      zeroDepreciation: 1,
      consumables: 1,
      engineProtectPlus: 1,
      roadSideAssistance: 1
    }
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};