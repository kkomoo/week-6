<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database and order model
include_once '../config/database.php';
include_once '../models/order.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Instantiate order object
$order = new Order($db);

// Get user ID from URL
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die();

// Set user ID property
$order->user_id = $user_id;

// Query orders
$stmt = $order->readByUser();
$num = $stmt->rowCount();

// Check if more than 0 record found
if($num > 0){
    // Orders array
    $orders_arr = array();
    $orders_arr["records"] = array();

    // Retrieve table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // Extract row
        extract($row);

        $order_item = array(
            "order_id" => $order_id,
            "user_id" => $user_id,
            "order_date" => $order_date,
            "total_amount" => $total_amount,
            "shipping_fee" => $shipping_fee,
            "order_status" => $order_status,
            "shipping_address" => $shipping_address
        );

        array_push($orders_arr["records"], $order_item);
    }

    // Set response code - 200 OK
    http_response_code(200);

    // Show orders data in json format
    echo json_encode($orders_arr);
}
else{
    // Set response code - 404 Not found
    http_response_code(404);

    // Tell the user no orders found
    echo json_encode(
        array("message" => "No orders found.")
    );
}
?>
