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

// Get order ID and user ID from URL
$order_id = isset($_GET['order_id']) ? $_GET['order_id'] : die();
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die();

// Set order properties
$order->order_id = $order_id;
$order->user_id = $user_id;

// Read order details
if($order->readOne()){
    // Get order items
    $stmt = $order->getOrderItems();
    $items = array();
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // Extract row
        extract($row);
        
        $item = array(
            "order_item_id" => $order_item_id,
            "product_id" => $product_id,
            "product_name" => $product_name,
            "product_desc" => $product_desc,
            "quantity" => $quantity,
            "price" => $price,
            "total" => $price * $quantity
        );
        
        array_push($items, $item);
    }
    
    // Create order array
    $order_arr = array(
        "order_id" => $order->order_id,
        "user_id" => $order->user_id,
        "order_date" => $order->order_date,
        "total_amount" => $order->total_amount,
        "shipping_fee" => $order->shipping_fee,
        "order_status" => $order->order_status,
        "shipping_address" => $order->shipping_address,
        "items" => $items
    );
    
    // Set response code - 200 OK
    http_response_code(200);
    
    // Show order data in json format
    echo json_encode($order_arr);
}
else{
    // Set response code - 404 Not found
    http_response_code(404);
    
    // Tell the user order not found
    echo json_encode(array("message" => "Order not found."));
}
?>
