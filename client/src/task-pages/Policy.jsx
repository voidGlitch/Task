import React, { useContext } from 'react';
import { FormContext } from './FormContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Policy = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const insurerOptions = ['HDFC', 'ICICI', 'BAJAJ', 'RELIANCE', 'TATA'];
  const policyTypeOptions = ['Comprehensive Package', 'Third Party', 'Standalone Own Damage'];

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
    navigate('/premium');
  };

  return (
    <>
      <Sidebar />
      <div className="space-y-8" style={{  marginLeft: '270px', width: '930px', fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Previous Policy Details</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            {/* Left Column */}
            <div style={{ width: '48%' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Previous Policy No:
                <input
                  type="text"
                  name="previousPolicyNo"
                  value={formData.previousPolicyDetails.previousPolicyNo}
                  onChange={(e) => handleChange(e, 'previousPolicyDetails')}
                  placeholder="Enter Previous Policy No"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Previous Policy Period:
                <input
                  type="text"
                  name="previousPolicyPeriod"
                  value={formData.previousPolicyDetails.previousPolicyPeriod}
                  onChange={(e) => handleChange(e, 'previousPolicyDetails')}
                  placeholder="Enter Previous Policy Period"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Previous Insurer Name:
                <select
                  name="previousInsurerName"
                  value={formData.previousPolicyDetails.previousInsurerName}
                  onChange={(e) => handleChange(e, 'previousPolicyDetails')}
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                >
                  <option value="">Select Insurer</option>
                  {insurerOptions.map((insurer, index) => (
                    <option key={index} value={insurer}>
                      {insurer}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Right Column */}
            <div style={{ width: '48%' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Previous Policy Type:
                <select
                  name="previousPolicyType"
                  value={formData.previousPolicyDetails.previousPolicyType}
                  onChange={(e) => handleChange(e, 'previousPolicyDetails')}
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                >
                  <option value="">Select Policy Type</option>
                  {policyTypeOptions.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Previous Year NCB:
                <input
                  type="text"
                  name="previousYearNCB"
                  value={formData.previousPolicyDetails.previousYearNCB}
                  onChange={(e) => handleChange(e, 'previousPolicyDetails')}
                  placeholder="Enter Previous Year NCB"
                  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Claims Made Under Previous Policy:
                <input
                  type="text"
                  name="claimsMadeUnderPreviousPolicy"
                  value={formData.previousPolicyDetails.claimsMadeUnderPreviousPolicy}
                  onChange={(e) => handleChange(e, 'previousPolicyDetails')}
                  placeholder="Enter Claims Made"
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

export default Policy;