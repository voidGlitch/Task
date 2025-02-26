import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Insurance Policy Management System</h1>
      <p style={styles.subHeading}>Manage your policies efficiently and effectively.</p>

      <div style={styles.navContainer}>
        <Link to="/insig" style={styles.navLink}>
          View All Policies
        </Link>
        <Link to="/user" style={styles.navLink}>
          Create New Policy
        </Link>
        <Link to="/history" style={styles.navLink}>
          View Policy History
        </Link>
      </div>
    </div>
  );
};

export default Home;

// CSS Styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '40px',
  },
  navContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  navLink: {
    padding: '15px 30px',
    backgroundColor: '#007BFF',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    width: '200px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  },
};