# Insurance Policy Insights Dashboard

This project is a **React-based frontend application** that interacts with a backend API to fetch and display insights related to insurance policies. It provides a comprehensive dashboard for viewing policy details, registration numbers, vehicle IDV (Insured Declared Value), and more. The backend is built using **Express.js** and **MongoDB** to store and manage policy data.

---

## Features

1. **Policy Insights**:
   - View all insured names and registration numbers.
   - Get policy counts grouped by insured names.
   - Calculate average and total vehicle IDV.
   - Group policies by vehicle make.
   - Filter policies with high IDV (e.g., IDV > 500,000).
   - Find policies with no claims.

2. **Interactive Dashboard**:
   - Fetch policy details by name or registration number.
   - Display data in clean, responsive tables.
   - Buttons for triggering specific data fetches.

3. **Modern UI**:
   - Clean and intuitive design with CSS styling.
   - Tables for organized data display.
   - Buttons with hover effects for better user interaction.

---

## Technologies Used

- **Frontend**:
  - React.js
  - Axios (for API requests)
  - CSS (for styling)

- **Backend**:
  - Express.js
  - MongoDB (for data storage)
  - Mongoose (for MongoDB object modeling)

---

## Installation

### Prerequisites

1. **Node.js** and **npm** installed on your machine.
2. **MongoDB** installed and running locally or a connection string to a remote MongoDB instance.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/voidGlitch/insurance-policy-insights.git
   cd insurance-policy-insights
   ```

2. **Install Dependencies**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend` directory:
     ```env
     MONGO_URI=mongodb://localhost:27017/insuranceDB
     PORT=3000
     ```

4. **Run the Backend**:
   - Navigate to the `backend` directory and start the server:
     ```bash
     cd backend
     npm start
     ```

5. **Run the Frontend**:
   - Navigate to the `frontend` directory and start the React app:
     ```bash
     cd ../frontend
     npm start
     ```

6. **Access the Application**:
   - Open your browser and go to `http://localhost:3000` to view the dashboard.

---

## How to Run

### Running Both Backend and Frontend Simultaneously

To run both the backend and frontend servers simultaneously, use the `both` script:

1. **Install `concurrently`** (if not already installed):
   ```bash
   npm install concurrently --save-dev
   ```

2. **Run Both Servers**:
   - From the root directory of the project, run:
     ```bash
     npm run both
     ```
   - This will start the backend server on `http://localhost:3000` and the frontend server on `http://localhost:3001`.

---

## Folder Structure

```
TASK/
├── api/
│   ├── Policy/
│   ├── user/
│   │   ├── controller.js
│   │   ├── model.js
│   │   ├── router.js
├── client/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── vite.config.js
├── dist/
├── node_modules/
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
```

---

## Screenshots

![Dashboard Screenshot](./screenshots/dashboard.png)  
*Insights Dashboard with Tables and Buttons*

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch and submit a pull request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## Acknowledgments

- Built as part of a learning project to understand React, Express, and MongoDB integration.
- Inspired by real-world insurance policy management systems.

---

## Contact

For questions or feedback, please reach out to:  
**Shreshthav**  
**Email:** official.shreshthav@example.com  
**GitHub:** [voidGlitch](https://github.com/voidGlitch)

---

Enjoy exploring the Insurance Policy Insights Dashboard! 🚀

