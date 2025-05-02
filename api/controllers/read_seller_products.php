<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database and product model
include_once '../config/database.php';
include_once '../models/product.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Instantiate product object
$product = new Product($db);

// Get seller ID from URL
$seller_id = isset($_GET['seller_id']) ? $_GET['seller_id'] : die();

// Set seller ID property
$product->seller_id = $seller_id;

// Query products
$stmt = $product->readBySeller();
$num = $stmt->rowCount();

// Check if more than 0 record found
if($num > 0){
    // Products array
    $products_arr = array();
    $products_arr["records"] = array();

    // Retrieve table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // Extract row
        extract($row);

        $product_item = array(
            "product_id" => $product_id,
            "product_name" => $product_name,
            "product_desc" => $product_desc,
            "category" => $category,
            "price" => $price,
            "stock_quantity" => $stock_quantity,
            "created_at" => $created_at
        );

        array_push($products_arr["records"], $product_item);
    }

    // Set response code - 200 OK
    http_response_code(200);

    // Show products data in json format
    echo json_encode($products_arr);
}
else{
    // Set response code - 404 Not found
    http_response_code(404);

    // Tell the user no products found
    echo json_encode(
        array("message" => "No products found for this seller.")
    );
}
?>
