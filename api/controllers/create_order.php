<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database and models
include_once '../config/database.php';
include_once '../models/order.php';
include_once '../models/cart.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Instantiate order object
$order = new Order($db);

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Make sure data is not empty
if(
    !empty($data->user_id) &&
    !empty($data->total_amount) &&
    !empty($data->shipping_address) &&
    !empty($data->cart_items)
){
    // Start transaction
    $db->beginTransaction();

    try {
        // Set order property values
        $order->user_id = $data->user_id;
        $order->total_amount = $data->total_amount;
        $order->shipping_fee = isset($data->shipping_fee) ? $data->shipping_fee : 0;
        $order->order_status = "Pending";
        $order->shipping_address = $data->shipping_address;

        // Create the order
        if($order->create()){
            // Add order items
            $all_items_added = true;
            
            foreach($data->cart_items as $item){
                if(!$order->addOrderItem($item->product_id, $item->quantity, $item->price)){
                    $all_items_added = false;
                    break;
                }
            }
            
            if($all_items_added){
                // Clear the cart
                $cart = new Cart($db);
                $cart->user_id = $data->user_id;
                $cart->clear();
                
                // Commit transaction
                $db->commit();
                
                // Set response code - 201 created
                http_response_code(201);
                
                // Tell the user
                echo json_encode(array(
                    "message" => "Order was created.",
                    "order_id" => $order->order_id
                ));
            }
            else {
                // Rollback transaction
                $db->rollBack();
                
                // Set response code - 503 service unavailable
                http_response_code(503);
                
                // Tell the user
                echo json_encode(array("message" => "Unable to add order items."));
            }
        }
        // If unable to create the order
        else{
            // Rollback transaction
            $db->rollBack();
            
            // Set response code - 503 service unavailable
            http_response_code(503);
            
            // Tell the user
            echo json_encode(array("message" => "Unable to create order."));
        }
    }
    catch (Exception $e) {
        // Rollback transaction
        $db->rollBack();
        
        // Set response code - 503 service unavailable
        http_response_code(503);
        
        // Tell the user
        echo json_encode(array("message" => "Error: " . $e->getMessage()));
    }
}
// Tell the user data is incomplete
else{
    // Set response code - 400 bad request
    http_response_code(400);
    
    // Tell the user
    echo json_encode(array("message" => "Unable to create order. Data is incomplete."));
}
?>
