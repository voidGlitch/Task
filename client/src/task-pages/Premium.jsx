import React, { useContext } from 'react';
import { FormContext } from './FormContext';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Premium = () => {
  const { formData, setFormData } = useContext(FormContext);

  // Default values for premium breakup
  const defaultValues = {
    basicODPremium: 1372,
    zeroDepreciation: 3219,
    consumables: 334,
    engineProtectPlus: 1254,
    roadSideAssistance: 199,
  };

  // Handle increment and decrement for premium breakup
  const handleAdjust = (field, operation) => {
    setFormData((prevState) => ({
      ...prevState,
      premiumBreakup: {
        ...prevState.premiumBreakup,
        [field]:
          operation === 'increment'
            ? prevState.premiumBreakup[field] + 1
            : Math.max(1, prevState.premiumBreakup[field] - 1),
      },
    }));
  };

  const navigate = useNavigate();
  const sanitizeError = (error) => {
    return {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
    };
  };

  // Calculate Own Damage Premium (A) Subtotal
  const ownDamageSubtotal =
    defaultValues.basicODPremium * formData.premiumBreakup.basicODPremium +
    defaultValues.zeroDepreciation * formData.premiumBreakup.zeroDepreciation +
    defaultValues.consumables * formData.premiumBreakup.consumables +
    defaultValues.engineProtectPlus * formData.premiumBreakup.engineProtectPlus +
    defaultValues.roadSideAssistance * formData.premiumBreakup.roadSideAssistance;

  // No Claim Bonus (25%)
  const noClaimBonus = 343; // Fixed as per your requirement

  // Total Own Damage Premium (A) after No Claim Bonus
  const totalOwnDamagePremium = ownDamageSubtotal - noClaimBonus;

  // Liability Premium (B) Subtotal
  const basicThirdPartyLiability = 3416;
  const legalLiabilityToPaidDriver = 50;
  const liabilitySubtotal = basicThirdPartyLiability + legalLiabilityToPaidDriver;

  // Overall Total (A + B)
  const overallTotal = totalOwnDamagePremium + liabilitySubtotal;

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Prepare the data to be sent to the server
      const policyData = {
        ...formData,
        premiumBreakup: {
          ...formData.premiumBreakup,
          ownDamageSubtotal,
          noClaimBonus,
          totalOwnDamagePremium,
          liabilitySubtotal,
          overallTotal,
        },
      };
      console.log(policyData);
      // Send a POST request to the server
      const response = await axios.post('http://localhost:3000/api/policy', policyData);

      // Log success message
      console.log('Policy created successfully:', response.data);

      // Navigate to the next page
      navigate('/gen', { state: { policyData: formData } });
    } catch (error) {
        // Log error message if the request fails
        console.error('Error creating policy:', error);
    
        // Sanitize the error object
        const sanitizedError = sanitizeError(error);
    
        // Navigate to the PagenotFound page with the sanitized error state
        navigate('/pagenotfound', { state: { error: sanitizedError } });
      }

    
  };

  return (
    <>
      <Sidebar />
      <div
        className="space-y-8"
        style={{
          marginLeft: '270px',
          width: '930px',
          fontFamily: 'Arial, sans-serif',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Premium Break-up</h2>

        {/* Two-column layout */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          {/* Left Column - Own Damage Premium (A) */}
          <div style={{ width: '48%' }}>
            <h3>Own Damage Premium (A)</h3>
            <div style={{ marginBottom: '20px' }}>
              {[
                { label: 'Basic OD Premium', field: 'basicODPremium' },
                { label: 'Zero Depreciation (ZD-)', field: 'zeroDepreciation' },
                { label: 'Consumables', field: 'consumables' },
                { label: 'Engine Protect Plus', field: 'engineProtectPlus' },
                { label: 'Road Side Assistance (RSA-Standard)', field: 'roadSideAssistance' },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
                >
                  <span>{item.label}</span>
                  <div>
                    <button
                      onClick={() => handleAdjust(item.field, 'decrement')}
                      style={{
                        padding: '5px 10px',
                        marginRight: '5px',
                        backgroundColor: '#ff4d4d',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      -
                    </button>
                    <span>{formData.premiumBreakup[item.field]}</span>
                    <button
                      onClick={() => handleAdjust(item.field, 'increment')}
                      style={{
                        padding: '5px 10px',
                        marginLeft: '5px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Own Damage Premium (A) Subtotal */}
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
              <strong>Subtotal (A):</strong> {ownDamageSubtotal}
            </div>
          </div>

          {/* Right Column - Liability Premium (B) */}
          <div style={{ width: '48%' }}>
            <h3>Liability Premium (B)</h3>
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
              >
                <span>Basic Third Party Liability</span>
                <span>{basicThirdPartyLiability}</span>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
              >
                <span>Legal Liability to Paid Driver</span>
                <span>{legalLiabilityToPaidDriver}</span>
              </div>
            </div>

            {/* Liability Premium (B) Subtotal */}
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
              <strong>Subtotal (B):</strong> {liabilitySubtotal}
            </div>
          </div>
        </div>

        {/* Savings - No Claim Bonus (25%) */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Savings</h3>
          <div style={{ textAlign: 'right', marginBottom: '10px' }}>
            <strong>No Claim Bonus (25%):</strong> {noClaimBonus}
          </div>
        </div>

        {/* Total Own Damage Premium (A) */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Total Own Damage Premium (A)</h3>
          <div style={{ textAlign: 'right', marginBottom: '10px' }}>
            <strong>Total (A):</strong> {totalOwnDamagePremium}
          </div>
        </div>

        {/* Overall Total (A + B) */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Overall Total</h3>
          <div style={{ textAlign: 'right', marginBottom: '10px' }}>
            <strong>Total (A + B):</strong> {overallTotal}
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Premium;