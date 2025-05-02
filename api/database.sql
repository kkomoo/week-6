-- Create database
CREATE DATABASE IF NOT EXISTS e_commerce_db;
USE e_commerce_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users_tb (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_address VARCHAR(100) NOT NULL UNIQUE,
    address TEXT,
    role VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create seller_login_tb table
CREATE TABLE IF NOT EXISTS seller_login_tb (
    seller_login_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    logout_time TIMESTAMP NULL,
    session_duration TIME,
    FOREIGN KEY (user_id) REFERENCES users_tb(user_id)
);

-- Create products table
CREATE TABLE IF NOT EXISTS products_tb (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_desc TEXT,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    seller_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users_tb(user_id)
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory_tb (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_tb(product_id)
);

-- Create cart table
CREATE TABLE IF NOT EXISTS cart_tb (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_tb(user_id),
    FOREIGN KEY (product_id) REFERENCES products_tb(product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders_tb (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_fee DECIMAL(10,2) DEFAULT 0,
    order_status VARCHAR(20) DEFAULT 'Pending',
    shipping_address TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_tb(user_id)
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items_tb (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders_tb(order_id),
    FOREIGN KEY (product_id) REFERENCES products_tb(product_id)
);

-- Insert sample data (optional)
-- Insert a sample admin user (password: admin123)
INSERT INTO users_tb (username, password, email_address, address, role) VALUES
('admin', '$2y$10$8WxYR0aA58fGQz.vFQinXOkV4uZ.WGg9XO7ovQx0jlMoDF8GcXITi', 'admin@example.com', '123 Admin St', 'admin');

-- Insert a sample seller (password: seller123)
INSERT INTO users_tb (username, password, email_address, address, role) VALUES
('seller', '$2y$10$8WxYR0aA58fGQz.vFQinXOkV4uZ.WGg9XO7ovQx0jlMoDF8GcXITi', 'seller@example.com', '456 Seller Ave', 'seller');

-- Insert a sample customer (password: customer123)
INSERT INTO users_tb (username, password, email_address, address, role) VALUES
('customer', '$2y$10$8WxYR0aA58fGQz.vFQinXOkV4uZ.WGg9XO7ovQx0jlMoDF8GcXITi', 'customer@example.com', '789 Customer Blvd', 'customer');

-- Insert sample products
INSERT INTO products_tb (product_name, product_desc, category, price, stock_quantity, seller_id) VALUES
('Classic Silver', 'Elegant silver watch with leather strap', 'Watches', 249.99, 10, 2),
('Diver Pro', 'Water resistant watch for diving enthusiasts', 'Watches', 399.99, 5, 2),
('Urban Minimalist', 'Sleek and minimal design for everyday wear', 'Watches', 199.99, 15, 2);

-- Insert sample inventory
INSERT INTO inventory_tb (product_id, quantity) VALUES
(1, 10),
(2, 5),
(3, 15);
