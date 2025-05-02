# Chronosphere E-Commerce API

This is the backend API for the Chronosphere E-Commerce platform, a luxury watch store.

## Setup Instructions

### Prerequisites
- XAMPP (or similar stack with Apache, MySQL, and PHP)
- PHP 7.4 or higher
- MySQL 5.7 or higher

### Database Setup
1. Start XAMPP and ensure Apache and MySQL services are running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Create a new database named `e_commerce_db`
4. Import the `database.sql` file to set up the tables and sample data

### API Setup
1. Place the `api` folder in your XAMPP htdocs directory (e.g., `C:\xampp\htdocs\week-6\api`)
2. The API should now be accessible at `http://localhost/week-6/api/`

## API Endpoints

### Authentication
- Register: `POST /api/controllers/register.php`
- Login: `POST /api/controllers/login.php`

### Products
- Get All Products: `GET /api/controllers/read_products.php`
- Create Product: `POST /api/controllers/create_product.php`
- Get Seller Products: `GET /api/controllers/read_seller_products.php?seller_id={id}`

### Cart
- Get Cart Items: `GET /api/controllers/read_cart.php?user_id={id}`
- Add to Cart: `POST /api/controllers/add_to_cart.php`
- Update Cart Item: `PUT /api/controllers/update_cart.php`
- Remove from Cart: `DELETE /api/controllers/remove_from_cart.php`

### Orders
- Create Order: `POST /api/controllers/create_order.php`
- Get User Orders: `GET /api/controllers/read_orders.php?user_id={id}`
- Get Order Details: `GET /api/controllers/read_order_details.php?order_id={id}&user_id={user_id}`

### Inventory
- Get Seller Inventory: `GET /api/controllers/read_inventory.php?seller_id={id}`
- Update Inventory: `PUT /api/controllers/update_inventory.php`

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
