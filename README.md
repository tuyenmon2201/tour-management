# **Tour Management**

## 📝 **Introduction**

This project is a Tour Management System built using Server-Side Rendering (SSR). It includes an admin panel for managing tours and orders, as well as a client-side interface for booking tours.

## 📌 **Features**

🔹 Admin Panel

- Category Management:

  - View category list

- Tour Management:

  - View tour list

  - Add new tours

- Order Management:

  - View order list

  - View order details

🔹 Client-Side Features

- Tour Categories Page:

  - Display all tour categories

- Tour List Page:

  - Display all available tours

- Tours by Category Page:

  - Filter and display tours by category

- Tour Details Page:

  - View detailed information about a specific tour

- Cart & Booking Page:

  - View selected tours

  - Display order total

  - Enter customer information

- Order Success Page:

   - Confirmation page after successful booking

## ⚙️ **Installation and Setup**

📌 **Prerequisites**

Ensure you have the following installed:

- Node.js (Latest LTS version recommended)

- MySQL (Database for storing tour and order data)

- Git

📌 **Clone Repository**

- git clone https://github.com/tuyenmon2201/tour-management.git
- cd tour-management

📌 **Install Dependencies**

- npm install

📌 **Database Configuration**

Create a .env file in the root directory and configure the following variables:

- PORT=3000
- DB_HOST=your_database_host
- DB_USER=your_database_user
- DB_PASSWORD=your_database_password
- DB_NAME=your_database_name
- SESSION_SECRET=your_secret_key

📌 **Start the Application**

🔹 Development Mode

- npm run dev

🔹 Production Mode

- npm start

📌 **Access the Application**

Open http://localhost:3000/ in your browser.

🛠️ **Technologies Used**

- ExpressJS - Web framework for Node.js

- MySQL - Relational database for data storage

- Sequelize - ORM for MySQL

- PUG - Template engine for UI rendering

- BcryptJS - Password hashing

- Dotenv - Environment variable management

🤝 **Contributing**

1. Fork the repository.

2. Create a new branch: git checkout -b feature-name

3. Commit your changes: git commit -m "Add some feature"

4. Push to the branch: git push origin feature-name

5. Submit a Pull Request.