# Chronosphere E-Commerce Platform

Chronosphere is a luxury watch e-commerce platform built with React for the frontend and PHP/MySQL for the backend.

## Features

- User authentication (login/register)
- Product browsing and filtering
- Shopping cart functionality
- Order processing
- Seller dashboard for managing products and inventory

## Setup Instructions

### Prerequisites
- XAMPP (or similar stack with Apache, MySQL, and PHP)
- Node.js and npm

### Backend Setup
1. Start XAMPP and ensure Apache and MySQL services are running
2. Place the project folder in your XAMPP htdocs directory (e.g., `C:\xampp\htdocs\week-6`)
3. Open your browser and navigate to `http://localhost/week-6/setup.php` to set up the database

### Frontend Setup
1. Open a terminal in the project directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Sample Users

The database includes the following sample users:

1. Admin
   - Email: admin@example.com
   - Password: admin123

2. Seller
   - Email: seller@example.com
   - Password: seller123

3. Customer
   - Email: customer@example.com
   - Password: customer123

## API Documentation

The API documentation is available at `http://localhost/week-6/api/`

## Project Structure

- `/src` - React frontend code
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/assets` - Static assets like images
- `/api` - PHP backend code
  - `/config` - Database configuration
  - `/controllers` - API endpoints
  - `/models` - Data models
- `/public` - Public assets

## Technologies Used

- Frontend:
  - React
  - React Router
  - Bootstrap
  - FontAwesome

- Backend:
  - PHP
  - MySQL
  - PDO for database access

## License

This project is for educational purposes only.
