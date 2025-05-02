<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database and inventory model
include_once '../config/database.php';
include_once '../models/inventory.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Instantiate inventory object
$inventory = new Inventory($db);

// Get seller ID from URL
$seller_id = isset($_GET['seller_id']) ? $_GET['seller_id'] : die();

// Query inventory
$stmt = $inventory->readBySeller($seller_id);
$num = $stmt->rowCount();

// Check if more than 0 record found
if($num > 0){
    // Inventory array
    $inventory_arr = array();
    $inventory_arr["records"] = array();

    // Retrieve table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // Extract row
        extract($row);

        $inventory_item = array(
            "inventory_id" => $inventory_id,
            "product_id" => $product_id,
            "product_name" => $product_name,
            "category" => $category,
            "price" => $price,
            "quantity" => $quantity,
            "last_updated" => $last_updated
        );

        array_push($inventory_arr["records"], $inventory_item);
    }

    // Set response code - 200 OK
    http_response_code(200);

    // Show inventory data in json format
    echo json_encode($inventory_arr);
}
else{
    // Set response code - 404 Not found
    http_response_code(404);

    // Tell the user no inventory found
    echo json_encode(
        array("message" => "No inventory found for this seller.")
    );
}
?>
