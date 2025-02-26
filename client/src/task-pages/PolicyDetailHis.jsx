import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const PolicyDetailHis = () => {
  const [selectedName, setSelectedName] = useState('');
  const [selectedRegistrationNo, setSelectedRegistrationNo] = useState('');
  const [names, setNames] = useState([]);
  const [registrationNumbers, setRegistrationNumbers] = useState([]);
  const [policyDetails, setPolicyDetails] = useState(null);

  // Fetch all names and registration numbers from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const namesResponse = await axios.get('http://localhost:3000/api/form/names');
        setNames(namesResponse.data);

        const registrationNumbersResponse = await axios.get('http://localhost:3000/api/form/registration-numbers');
        setRegistrationNumbers(registrationNumbersResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // Fetch policy details when a name or registration number is selected
  useEffect(() => {
    const fetchPolicyDetails = async () => {
      if (selectedName || selectedRegistrationNo) {
        try {
          const response = await axios.get('http://localhost:3000/api/form/details', {
            params: {
              name: selectedName,
              registrationNo: selectedRegistrationNo,
            },
          });

          // Define key values for premium breakup calculations
          const keyvalues = {
            basicODPremium: 1372,
            zeroDepreciation: 3219,
            consumables: 334,
            engineProtectPlus: 1254,
            roadSideAssistance: 199,
            basicThirdPartyLiability: 3416, // Example value
            legalLiabilityToPaidDriver: 50, // Example value
            taxes: 500, // Example value
          };

          // Calculate premium breakup fields
          const premiumBreakup = response.data.premiumBreakup;

          // Calculate Total A (Own Damage Premium)
          const totalA =
            premiumBreakup.basicODPremium * keyvalues.basicODPremium +
            premiumBreakup.zeroDepreciation * keyvalues.zeroDepreciation +
            premiumBreakup.consumables * keyvalues.consumables +
            premiumBreakup.engineProtectPlus * keyvalues.engineProtectPlus +
            premiumBreakup.roadSideAssistance * keyvalues.roadSideAssistance;

          // Calculate Total B (Liability Premium)
          const totalB =
             keyvalues.basicThirdPartyLiability +
           keyvalues.legalLiabilityToPaidDriver;

          // Calculate Grand Total
          const grandTotal = totalA + totalB + (keyvalues.taxes);

          // Add calculated fields to premiumBreakup
          response.data.premiumBreakup.totalA = totalA;
          response.data.premiumBreakup.totalB = totalB;
          response.data.premiumBreakup.grandTotal = grandTotal;

          setPolicyDetails(response.data);
        } catch (err) {
          console.error('Error fetching policy details:', err);
        }
      }
    };

    fetchPolicyDetails();
  }, [selectedName, selectedRegistrationNo]);

  // Handler for name dropdown change
  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
    setSelectedRegistrationNo(''); // Clear registration number selection
  };

  // Handler for registration number dropdown change
  const handleRegistrationNoChange = (event) => {
    setSelectedRegistrationNo(event.target.value);
    setSelectedName(''); // Clear name selection
  };

  return (
    <>
      <Sidebar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Policy Detail History</h2>
        <p style={styles.subHeading}>Please select a name or registration number from the dropdown:</p>

        {/* Dropdown for selecting a name */}
        <div style={styles.dropdownContainer}>
          <label htmlFor="name" style={styles.label}>
            Select by Name:{' '}
          </label>
          <select
            id="name"
            value={selectedName}
            onChange={handleNameChange}
            style={styles.dropdown}
          >
            <option value="">Select a name</option>
            {names.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for selecting a registration number */}
        <div style={styles.dropdownContainer}>
          <label htmlFor="registrationNo" style={styles.label}>
            Select by Registration Number:{' '}
          </label>
          <select
            id="registrationNo"
            value={selectedRegistrationNo}
            onChange={handleRegistrationNoChange}
            style={styles.dropdown}
          >
            <option value="">Select a registration number</option>
            {registrationNumbers.map((regNo, index) => (
              <option key={index} value={regNo}>
                {regNo}
              </option>
            ))}
          </select>
        </div>

        {/* Display the selected name or registration number */}
        {(selectedName || selectedRegistrationNo) && (
          <div style={styles.selectedContainer}>
            <strong>Selected:</strong> {selectedName || selectedRegistrationNo}
          </div>
        )}

        {/* Display policy details in a structured table format */}
        {policyDetails && (
          <div style={styles.policyDetailsContainer}>
            <h3 style={styles.policyDetailsHeading}>Policy Details</h3>
            <div style={styles.policyDetailsContent}>
              <table style={styles.table}>
                <tbody>
                  {/* Insured Details */}
                  <tr>
                    <th colSpan="2" style={styles.tableHeader}>Insured Details</th>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Name</td>
                    <td style={styles.tableCell}>{policyDetails.insuredDetails.name}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Address</td>
                    <td style={styles.tableCell}>{policyDetails.insuredDetails.address}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Mobile Number</td>
                    <td style={styles.tableCell}>{policyDetails.insuredDetails.mobileNumber}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Policy No.</td>
                    <td style={styles.tableCell}>{policyDetails.insuredDetails.policyNo}</td>
                  </tr>

                  {/* Partner Details */}
                  <tr>
                    <th colSpan="2" style={styles.tableHeader}>Partner Details</th>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Partner Name</td>
                    <td style={styles.tableCell}>{policyDetails.partnerDetails.partnerName}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Partner Code</td>
                    <td style={styles.tableCell}>{policyDetails.partnerDetails.partnerCode}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Partner Mobile Number</td>
                    <td style={styles.tableCell}>{policyDetails.partnerDetails.partnerMobileNumber}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Partner Email</td>
                    <td style={styles.tableCell}>{policyDetails.partnerDetails.partnerEmail}</td>
                  </tr>

                  {/* Vehicle Details */}
                  <tr>
                    <th colSpan="2" style={styles.tableHeader}>Vehicle Details</th>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Registration No.</td>
                    <td style={styles.tableCell}>{policyDetails.vehicleDetails.registrationNo}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Make</td>
                    <td style={styles.tableCell}>{policyDetails.vehicleDetails.make}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Model</td>
                    <td style={styles.tableCell}>{policyDetails.vehicleDetails.model}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Type of Body</td>
                    <td style={styles.tableCell}>{policyDetails.vehicleDetails.typeOfBody}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>CC/KW</td>
                    <td style={styles.tableCell}>{policyDetails.vehicleDetails.ccKw}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Manufacturing Year</td>
                    <td style={styles.tableCell}>{policyDetails.vehicleDetails.mfgYr}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Seating Capacity</td>
                    <td style={styles.tableCell}>{policyDetails.vehicleDetails.seatingCapacity}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Chassis No.</td>
                    <td style={styles.tableCell}>{policyDetails.vehicleDetails.chassisNo}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Engine No.</td>
                    <td style={styles.tableCell}>{policyDetails.vehicleDetails.engineNo}</td>
                  </tr>

                  {/* IDV Details */}
                  <tr>
                    <th colSpan="2" style={styles.tableHeader}>IDV Details</th>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Vehicle IDV</td>
                    <td style={styles.tableCell}>{policyDetails.idvDetails.vehicleIDV}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Trailer</td>
                    <td style={styles.tableCell}>{policyDetails.idvDetails.trailer}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Non-Electrical Accessories</td>
                    <td style={styles.tableCell}>{policyDetails.idvDetails.nonElectricalAccessories}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Electrical Accessories</td>
                    <td style={styles.tableCell}>{policyDetails.idvDetails.electricalAccessories}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>CNG/LPG Unit</td>
                    <td style={styles.tableCell}>{policyDetails.idvDetails.cngLpgUnit}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Total IDV</td>
                    <td style={styles.tableCell}>{policyDetails.idvDetails.totalIDV}</td>
                  </tr>

                  {/* Previous Policy Details */}
                  <tr>
                    <th colSpan="2" style={styles.tableHeader}>Previous Policy Details</th>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Previous Policy No.</td>
                    <td style={styles.tableCell}>{policyDetails.previousPolicyDetails.previousPolicyNo}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Previous Policy Period</td>
                    <td style={styles.tableCell}>{policyDetails.previousPolicyDetails.previousPolicyPeriod}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Previous Insurer Name</td>
                    <td style={styles.tableCell}>{policyDetails.previousPolicyDetails.previousInsurerName}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Previous Policy Type</td>
                    <td style={styles.tableCell}>{policyDetails.previousPolicyDetails.previousPolicyType}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Previous Year NCB</td>
                    <td style={styles.tableCell}>{policyDetails.previousPolicyDetails.previousYearNCB}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Claims Made Under Previous Policy</td>
                    <td style={styles.tableCell}>{policyDetails.previousPolicyDetails.claimsMadeUnderPreviousPolicy}</td>
                  </tr>

                  {/* Premium Breakup */}
                  <tr>
                    <th colSpan="2" style={styles.tableHeader}>Premium Breakup</th>
                  </tr>
                  <tr>
                 
                    <td style={styles.tableCell}>Basic OD Premium@1377</td>
                    <td style={styles.tableCell}>{policyDetails.premiumBreakup.basicODPremium}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Zero Depreciation @ 3219</td>
                    <td style={styles.tableCell}>{policyDetails.premiumBreakup.zeroDepreciation}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Consumables @ 334</td>
                    <td style={styles.tableCell}>{policyDetails.premiumBreakup.consumables}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Engine Protect Plus @ 1254</td>
                    <td style={styles.tableCell}>{policyDetails.premiumBreakup.engineProtectPlus}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Road Side Assistance @199</td>
                    <td style={styles.tableCell}>{policyDetails.premiumBreakup.roadSideAssistance}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Basic Third Party Liability</td>
                    <td style={styles.tableCell}>1456</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Legal Liability to Paid Driver</td>
                    <td style={styles.tableCell}>50</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Taxes</td>
                    <td style={styles.tableCell}>500</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}><strong>Total A (Own Damage Premium)</strong></td>
                    <td style={styles.tableCell}><strong>{policyDetails.premiumBreakup.totalA}</strong></td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}><strong>Total B (Liability Premium)</strong></td>
                    <td style={styles.tableCell}><strong>{policyDetails.premiumBreakup.totalB}</strong></td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}><strong>Grand Total</strong></td>
                    <td style={styles.tableCell}><strong>{policyDetails.premiumBreakup.grandTotal}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PolicyDetailHis;

// CSS Styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  subHeading: {
    textAlign: 'center',
    color: '#555',
    marginBottom: '20px',
  },
  dropdownContainer: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginRight: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  dropdown: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '300px',
  },
  selectedContainer: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '18px',
    color: '#333',
  },
  policyDetailsContainer: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  policyDetailsHeading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  policyDetailsContent: {
    fontFamily: 'monospace',
    color: '#555',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableHeader: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
};