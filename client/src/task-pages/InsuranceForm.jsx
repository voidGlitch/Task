import React, { useContext } from 'react';
import { FormContext } from './FormContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const InsuranceForm = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2)); // Display JSON in console
    navigate('/vehicle');
  };

  return (
    <>
      <Sidebar />
      <div className="space-y-8" style={{  marginLeft: '270px', width: '930px', fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Insurance Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            {/* Insured Details Column */}
            <div style={{ width: '48%' }}>
              <h3>Insured Details</h3>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.insuredDetails.name}
                  onChange={(e) => handleChange(e, 'insuredDetails')}
                  placeholder="Enter Name"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Address:
                <input
                  type="text"
                  name="address"
                  value={formData.insuredDetails.address}
                  onChange={(e) => handleChange(e, 'insuredDetails')}
                  placeholder="Enter Address"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Mobile Number:
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.insuredDetails.mobileNumber}
                  onChange={(e) => handleChange(e, 'insuredDetails')}
                  placeholder="Enter Mobile Number"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Policy No:
                <input
                  type="text"
                  name="policyNo"
                  value={formData.insuredDetails.policyNo}
                  onChange={(e) => handleChange(e, 'insuredDetails')}
                  placeholder="Enter Policy Number"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
            </div>

            {/* Partner Details Column */}
            <div style={{ width: '48%' }}>
              <h3>Partner Details</h3>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Partner Name:
                <input
                  type="text"
                  name="partnerName"
                  value={formData.partnerDetails.partnerName}
                  onChange={(e) => handleChange(e, 'partnerDetails')}
                  placeholder="Enter Partner Name"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Partner Code:
                <input
                  type="text"
                  name="partnerCode"
                  value={formData.partnerDetails.partnerCode}
                  onChange={(e) => handleChange(e, 'partnerDetails')}
                  placeholder="Enter Partner Code"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Partner Mobile Number:
                <input
                  type="text"
                  name="partnerMobileNumber"
                  value={formData.partnerDetails.partnerMobileNumber}
                  onChange={(e) => handleChange(e, 'partnerDetails')}
                  placeholder="Enter Partner Mobile Number"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Partner Email:
                <input
                  type="email"
                  name="partnerEmail"
                  value={formData.partnerDetails.partnerEmail}
                  onChange={(e) => handleChange(e, 'partnerDetails')}
                  placeholder="Enter Partner Email"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
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
                fontSize: '16px'
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

export default InsuranceForm;