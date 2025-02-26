import React from 'react';
import { useLocation } from 'react-router-dom';

const PolicyDetail = () => {
  const location = useLocation();
  const { policyData } = location.state || {};

  if (!policyData) {
    return <div>No policy data found.</div>;
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Policy Certificate</h2>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Private Car Package Policy</h3>

      {/* Insured Details Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Insured Details</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Name</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.insuredDetails.name}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Address</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.insuredDetails.address}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Mobile Number</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.insuredDetails.mobileNumber}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Policy No</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.insuredDetails.policyNo}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Partner Details Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Partner Details</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Partner Name</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.partnerDetails.partnerName}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Partner Code</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.partnerDetails.partnerCode}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Partner Mobile Number</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.partnerDetails.partnerMobileNumber}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Partner Email</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.partnerDetails.partnerEmail}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Vehicle Details Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Vehicle Details</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Registration No.</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.vehicleDetails.registrationNo}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Make</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.vehicleDetails.make}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Model</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.vehicleDetails.model}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Type of Body</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.vehicleDetails.typeOfBody}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>CC/KW</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.vehicleDetails.ccKw}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Mfg Yr</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.vehicleDetails.mfgYr}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Seating Capacity</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.vehicleDetails.seatingCapacity}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Chassis No.</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.vehicleDetails.chassisNo}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Engine No.</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.vehicleDetails.engineNo}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* IDV Details Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>IDV Details</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <tbody>
  <tr>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>Vehicle IDV</td>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.idvDetails.vehicleIDV || 0}</td>
  </tr>
  <tr>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>Trailer</td>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.idvDetails.trailer || 0}</td>
  </tr>
  <tr>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>Non Electrical Accessories</td>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.idvDetails.nonElectricalAccessories || 0}</td>
  </tr>
  <tr>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>Electrical / Electronic Accessories</td>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.idvDetails.electricalAccessories || 0}</td>
  </tr>
  <tr>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>CNG/LPG Unit</td>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.idvDetails.cngLpgUnit || 0}</td>
  </tr>
  <tr>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>Total IDV</td>
    <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.idvDetails.totalIDV || 0}</td>
  </tr>
</tbody>
        </table>
      </div>

      {/* Previous Policy Details Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Previous Policy Details</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Previous Policy No</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.previousPolicyDetails.previousPolicyNo}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Previous Policy Period</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.previousPolicyDetails.previousPolicyPeriod}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Previous Insurer Name</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.previousPolicyDetails.previousInsurerName}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Previous Policy Type</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.previousPolicyDetails.previousPolicyType}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Previous Year NCB</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.previousPolicyDetails.previousYearNCB}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Claims Made Under Previous Policy</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.previousPolicyDetails.claimsMadeUnderPreviousPolicy}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Premium Breakup Section */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Premium Break-up</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Basic OD Premium</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.premiumBreakup.basicODPremium}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Zero Depreciation</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.premiumBreakup.zeroDepreciation}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Consumables</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.premiumBreakup.consumables}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Engine Protect Plus</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.premiumBreakup.engineProtectPlus}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>Road Side Assistance</td>
              <td style={{ padding: '8px', border: '1px solid #ccc' }}>{policyData.premiumBreakup.roadSideAssistance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PolicyDetail;