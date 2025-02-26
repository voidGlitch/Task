import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Insight.css'; // Import the CSS file

const Insight = () => {
  const [names, setNames] = useState([]);
  const [registrationNumbers, setRegistrationNumbers] = useState([]);
  const [policyDetails, setPolicyDetails] = useState(null);
  const [policyCountByName, setPolicyCountByName] = useState([]);
  const [averageVehicleIDV, setAverageVehicleIDV] = useState(null);
  const [totalIDV, setTotalIDV] = useState(null);
  const [policiesByMake, setPoliciesByMake] = useState([]);
  const [highIDVPolicies, setHighIDVPolicies] = useState([]);
  const [noClaimsPolicies, setNoClaimsPolicies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNames();
    fetchRegistrationNumbers();
    fetchPolicyCountByName();
    fetchAverageVehicleIDV();
    fetchTotalIDV();
    fetchPoliciesByMake();
    fetchHighIDVPolicies();
    fetchNoClaimsPolicies();
  }, []);

  // Fetch all names
  const fetchNames = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/form/names');
      setNames(response.data);
    } catch (err) {
      console.error('Error fetching names:', err);
      setError('Failed to fetch names');
    }
  };

  // Fetch all registration numbers
  const fetchRegistrationNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/form/registration-numbers');
      setRegistrationNumbers(response.data);
    } catch (err) {
      console.error('Error fetching registration numbers:', err);
      setError('Failed to fetch registration numbers');
    }
  };

  // Fetch policy count by name
  const fetchPolicyCountByName = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/form/policy-count-by-name');
      setPolicyCountByName(response.data);
    } catch (err) {
      console.error('Error fetching policy count by name:', err);
      setError('Failed to fetch policy count by name');
    }
  };

  // Fetch average vehicle IDV
  const fetchAverageVehicleIDV = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/form/average-vehicle-idv');
      setAverageVehicleIDV(response.data.averageIDV);
    } catch (err) {
      console.error('Error fetching average vehicle IDV:', err);
      setError('Failed to fetch average vehicle IDV');
    }
  };

  // Fetch total IDV
  const fetchTotalIDV = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/form/total-idv');
      setTotalIDV(response.data.totalIDV);
    } catch (err) {
      console.error('Error fetching total IDV:', err);
      setError('Failed to fetch total IDV');
    }
  };

  // Fetch policies by make
  const fetchPoliciesByMake = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/form/policies-by-make');
      setPoliciesByMake(response.data);
    } catch (err) {
      console.error('Error fetching policies by make:', err);
      setError('Failed to fetch policies by make');
    }
  };

  // Fetch high IDV policies
  const fetchHighIDVPolicies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/form/high-idv-policies');
      setHighIDVPolicies(response.data);
    } catch (err) {
      console.error('Error fetching high IDV policies:', err);
      setError('Failed to fetch high IDV policies');
    }
  };

  // Fetch no claims policies
  const fetchNoClaimsPolicies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/form/no-claims-policies');
      setNoClaimsPolicies(response.data);
    } catch (err) {
      console.error('Error fetching no claims policies:', err);
      setError('Failed to fetch no claims policies');
    }
  };

  // Fetch policy details by name or registration number
  const fetchPolicyDetails = async (name, registrationNo) => {
    try {
      const response = await axios.get('http://localhost:3000/api/form/details', {
        params: { name, registrationNo },
      });
      setPolicyDetails(response.data);
    } catch (err) {
      console.error('Error fetching policy details:', err);
      setError('Failed to fetch policy details');
    }
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="insight-container">
      <h1>Insights Dashboard</h1>

      <div className="section">
        <h2>Names</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {names.map((name, index) => (
              <tr key={index}>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Registration Numbers</h2>
        <table>
          <thead>
            <tr>
              <th>Registration Number</th>
            </tr>
          </thead>
          <tbody>
            {registrationNumbers.map((number, index) => (
              <tr key={index}>
                <td>{number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Policy Count by Name</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {policyCountByName.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Average Vehicle IDV</h2>
        <p className="value">{averageVehicleIDV}</p>
      </div>

      <div className="section">
        <h2>Total IDV</h2>
        <p className="value">{totalIDV}</p>
      </div>

      <div className="section">
        <h2>Policies by Make</h2>
        <table>
          <thead>
            <tr>
              <th>Make</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {policiesByMake.map((item, index) => (
              <tr key={index}>
                <td>{item.make}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>High IDV Policies</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Vehicle IDV</th>
            </tr>
          </thead>
          <tbody>
            {highIDVPolicies.map((policy, index) => (
              <tr key={index}>
                <td>{policy.name}</td>
                <td>{policy.vehicleIDV}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>No Claims Policies</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Claims</th>
            </tr>
          </thead>
          <tbody>
            {noClaimsPolicies.map((policy, index) => (
              <tr key={index}>
                <td>{policy.name}</td>
                <td>{policy.claims}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Insight;