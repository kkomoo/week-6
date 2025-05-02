<?php
// Database configuration
$host = "localhost";
$username = "root";
$password = "";
$db_name = "e_commerce_db";

// Connect to MySQL server
$conn = new mysqli($host, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE IF NOT EXISTS $db_name";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully or already exists<br>";
} else {
    echo "Error creating database: " . $conn->error . "<br>";
}

// Select the database
$conn->select_db($db_name);

// Read SQL file
$sql_file = file_get_contents("api/database.sql");

// Execute SQL commands
if ($conn->multi_query($sql_file)) {
    echo "Database tables created successfully<br>";
    
    // Process all result sets
    do {
        // Store first result set
        if ($result = $conn->store_result()) {
            $result->free();
        }
    } while ($conn->more_results() && $conn->next_result());
} else {
    echo "Error creating tables: " . $conn->error . "<br>";
}

// Close connection
$conn->close();

echo "<br>Setup completed. You can now use the e-commerce application.<br>";
echo "<a href='index.html'>Go to the application</a>";
?>
