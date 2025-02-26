import React, { useContext } from 'react';
import { FormContext } from './FormContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const VehicleIDVForm = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const makeOptions = ['MARUTI', 'HYUNDAI', 'TATA', 'MAHINDRA', 'TOYOTA'];
  const modelOptions = {
    MARUTI: ['IGNIS ZETA AMT', 'SWIFT VXI', 'BALENO DELTA'],
    HYUNDAI: ['CRETA SX', 'VENUE S', 'i20 ASTA'],
    TATA: ['NEXON XZ', 'HARRIER XZ', 'ALTROZ XZ'],
    MAHINDRA: ['THAR AX', 'XUV700 AX'],
    TOYOTA: ['INNOVA CRYSTA ZX', 'FORTUNER LEGEND']
  };
  const typeOfBodyOptions = ['HATCHBACK', 'SEDAN', 'SUV', 'MUV'];

  // Default values for IDV calculation
  const idvValues = {
    MARUTI: { HATCHBACK: 300000, SEDAN: 400000, SUV: 500000, MUV: 450000 },
    HYUNDAI: { HATCHBACK: 350000, SEDAN: 450000, SUV: 550000, MUV: 500000 },
    TATA: { HATCHBACK: 320000, SEDAN: 420000, SUV: 520000, MUV: 470000 },
    MAHINDRA: { HATCHBACK: 330000, SEDAN: 430000, SUV: 530000, MUV: 480000 },
    TOYOTA: { HATCHBACK: 340000, SEDAN: 440000, SUV: 540000, MUV: 490000 }
  };

  // Handle input changes
  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: value,
      },
    }));

    // Update Vehicle IDV when Make or Type of Body changes
    if (name === 'make' || name === 'typeOfBody') {
      const make = name === 'make' ? value : formData.vehicleDetails.make;
      const typeOfBody = name === 'typeOfBody' ? value : formData.vehicleDetails.typeOfBody;
      if (make && typeOfBody) {
        const vehicleIDV = idvValues[make][typeOfBody];
        setFormData((prevState) => ({
          ...prevState,
          idvDetails: {
            ...prevState.idvDetails,
            vehicleIDV,
          },
        }));
      }
    }
  };

  // Handle increment and decrement for IDV fields
  const handleAdjust = (field, operation) => {
    setFormData((prevState) => ({
      ...prevState,
      idvDetails: {
        ...prevState.idvDetails,
        [field]:
          operation === 'increment'
            ? Number(prevState.idvDetails[field] || 0) + 1
            : Math.max(0, Number(prevState.idvDetails[field] || 0) - 1),
      },
    }));
  };

  // Calculate Total IDV
  const totalIDV =
    Number(formData.idvDetails.vehicleIDV) +
    Number(formData.idvDetails.trailer || 0) * 10000 + // Default to 0 if empty
    Number(formData.idvDetails.nonElectricalAccessories || 0) * 5000 + // Default to 0 if empty
    Number(formData.idvDetails.electricalAccessories || 0) * 7000 + // Default to 0 if empty
    Number(formData.idvDetails.cngLpgUnit || 0) * 15000; // Default to 0 if empty

  // Update the formData state with the calculated totalIDV
  React.useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      idvDetails: {
        ...prevState.idvDetails,
        totalIDV: totalIDV, // Update totalIDV in the state
      },
    }));
  }, [totalIDV, setFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2)); // Display JSON in console
    navigate('/policy', { state: { policyData: formData } }); // Pass formData as state
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Vehicle and IDV Details</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            {/* Vehicle Details Column */}
            <div style={{ width: '48%' }}>
              <h3>Vehicle Details</h3>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Registration No.:
                <input
                  type="text"
                  name="registrationNo"
                  value={formData.vehicleDetails.registrationNo}
                  onChange={(e) => handleChange(e, 'vehicleDetails')}
                  placeholder="Enter Registration No."
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Make:
                <select
                  name="make"
                  value={formData.vehicleDetails.make}
                  onChange={(e) => handleChange(e, 'vehicleDetails')}
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                >
                  <option value="">Select Make</option>
                  {makeOptions.map((make, index) => (
                    <option key={index} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Model:
                <select
                  name="model"
                  value={formData.vehicleDetails.model}
                  onChange={(e) => handleChange(e, 'vehicleDetails')}
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                  disabled={!formData.vehicleDetails.make}
                >
                  <option value="">Select Model</option>
                  {formData.vehicleDetails.make &&
                    modelOptions[formData.vehicleDetails.make].map((model, index) => (
                      <option key={index} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Type of Body:
                <select
                  name="typeOfBody"
                  value={formData.vehicleDetails.typeOfBody}
                  onChange={(e) => handleChange(e, 'vehicleDetails')}
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                >
                  <option value="">Select Type of Body</option>
                  {typeOfBodyOptions.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                CC/KW:
                <input
                  type="text"
                  name="ccKw"
                  value={formData.vehicleDetails.ccKw}
                  onChange={(e) => handleChange(e, 'vehicleDetails')}
                  placeholder="Enter CC/KW"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Mfg Yr:
                <input
                  type="text"
                  name="mfgYr"
                  value={formData.vehicleDetails.mfgYr}
                  onChange={(e) => handleChange(e, 'vehicleDetails')}
                  placeholder="Enter Mfg Yr"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Seating Capacity:
                <input
                  type="text"
                  name="seatingCapacity"
                  value={formData.vehicleDetails.seatingCapacity}
                  onChange={(e) => handleChange(e, 'vehicleDetails')}
                  placeholder="Enter Seating Capacity"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Chassis No.:
                <input
                  type="text"
                  name="chassisNo"
                  value={formData.vehicleDetails.chassisNo}
                  onChange={(e) => handleChange(e, 'vehicleDetails')}
                  placeholder="Enter Chassis No."
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Engine No.:
                <input
                  type="text"
                  name="engineNo"
                  value={formData.vehicleDetails.engineNo}
                  onChange={(e) => handleChange(e, 'vehicleDetails')}
                  placeholder="Enter Engine No."
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
            </div>

            {/* IDV Details Column */}
            <div style={{ width: '48%' }}>
              <h3>IDV Details</h3>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Vehicle IDV (f):
                <input
                  type="text"
                  name="vehicleIDV"
                  value={formData.idvDetails.vehicleIDV}
                  readOnly
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Trailer (f):
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => handleAdjust('trailer', 'decrement')}
                    style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span>{formData.idvDetails.trailer}</span>
                  <button
                    type="button"
                    onClick={() => handleAdjust('trailer', 'increment')}
                    style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Non Electrical Accessories (f):
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => handleAdjust('nonElectricalAccessories', 'decrement')}
                    style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span>{formData.idvDetails.nonElectricalAccessories}</span>
                  <button
                    type="button"
                    onClick={() => handleAdjust('nonElectricalAccessories', 'increment')}
                    style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Electrical / Electronic Accessories (f):
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => handleAdjust('electricalAccessories', 'decrement')}
                    style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span>{formData.idvDetails.electricalAccessories}</span>
                  <button
                    type="button"
                    onClick={() => handleAdjust('electricalAccessories', 'increment')}
                    style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                CNG / LPG Unit (f):
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => handleAdjust('cngLpgUnit', 'decrement')}
                    style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span>{formData.idvDetails.cngLpgUnit}</span>
                  <button
                    type="button"
                    onClick={() => handleAdjust('cngLpgUnit', 'increment')}
                    style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Total IDV (f):
                <input
                  type="text"
                  name="totalIDV"
                  value={totalIDV}
                  readOnly
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              type="submit"
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
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VehicleIDVForm;