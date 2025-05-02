<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database and cart model
include_once '../config/database.php';
include_once '../models/cart.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Instantiate cart object
$cart = new Cart($db);

// Get user ID from URL
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die();

// Set user ID property
$cart->user_id = $user_id;

// Query cart items
$stmt = $cart->read();
$num = $stmt->rowCount();

// Check if more than 0 record found
if($num > 0){
    // Cart array
    $cart_arr = array();
    $cart_arr["records"] = array();
    $cart_arr["total"] = 0;

    // Retrieve table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // Extract row
        extract($row);

        $cart_item = array(
            "cart_id" => $cart_id,
            "user_id" => $user_id,
            "product_id" => $product_id,
            "product_name" => $product_name,
            "product_desc" => $product_desc,
            "price" => $price,
            "quantity" => $quantity,
            "total_price" => $total_price,
            "added_at" => $added_at
        );

        // Add to total
        $cart_arr["total"] += $total_price;

        array_push($cart_arr["records"], $cart_item);
    }

    // Set response code - 200 OK
    http_response_code(200);

    // Show cart data in json format
    echo json_encode($cart_arr);
}
else{
    // Set response code - 404 Not found
    http_response_code(404);

    // Tell the user no cart items found
    echo json_encode(
        array("message" => "No items in cart.")
    );
}
?>
