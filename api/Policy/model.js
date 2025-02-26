const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  insuredDetails: {
    name: { type: String }, // Removed required: true
    address: { type: String },
    mobileNumber: { type: String },
    policyNo: { type: String },
    ePolicyNo: { type: String },
    registrationNo: { type: String },
    registrationDate: { type: String },
    tenure: { type: String },
    periodOfInsurance: { type: String },
    nomineeName: { type: String },
    nomineeRelationship: { type: String },
    nomineeAge: { type: String },
    rtoLocation: { type: String },
    hypothecatedTo: { type: String },
    gstNumber: { type: String },
    invoiceNumber: { type: String },
    servicingBranchName: { type: String },
    servicingBranchAddress: { type: String },
  },
  partnerDetails: {
    partnerName: { type: String },
    partnerCode: { type: String },
    partnerMobileNumber: { type: String },
    partnerEmail: { type: String },
  },
  vehicleDetails: {
    registrationNo: { type: String ,unique:true},
    make: { type: String },
    model: { type: String },
    typeOfBody: { type: String },
    ccKw: { type: String },
    mfgYr: { type: String },
    seatingCapacity: { type: String },
    chassisNo: { type: String },
    engineNo: { type: String },
  },
  idvDetails: {
    vehicleIDV: { type: Number },
    trailer: { type: Number, default: 0 },
    nonElectricalAccessories: { type: Number, default: 0 },
    electricalAccessories: { type: Number, default: 0 },
    cngLpgUnit: { type: Number, default: 0 },
    totalIDV: { type: Number, default: 0 },
  },
  previousPolicyDetails: {
    previousPolicyNo: { type: String },
    previousPolicyPeriod: { type: String },
    previousInsurerName: { type: String },
    previousPolicyType: { type: String },
    previousYearNCB: { type: String },
    claimsMadeUnderPreviousPolicy: { type: String },
  },
  premiumBreakup: {
    basicODPremium: { type: Number },
    zeroDepreciation: { type: Number },
    consumables: { type: Number },
    engineProtectPlus: { type: Number },
    roadSideAssistance: { type: Number },
  },
});

module.exports = mongoose.model('Policy', PolicySchema);