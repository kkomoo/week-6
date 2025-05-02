<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database and cart model
include_once '../config/database.php';
include_once '../models/cart.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Instantiate cart object
$cart = new Cart($db);

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Make sure data is not empty
if(
    !empty($data->cart_id) &&
    !empty($data->user_id) &&
    !empty($data->quantity)
){
    // Set cart property values
    $cart->cart_id = $data->cart_id;
    $cart->user_id = $data->user_id;
    $cart->quantity = $data->quantity;

    // Update cart
    if($cart->update()){
        // Set response code - 200 ok
        http_response_code(200);

        // Tell the user
        echo json_encode(array("message" => "Cart item was updated."));
    }
    // If unable to update cart
    else{
        // Set response code - 503 service unavailable
        http_response_code(503);

        // Tell the user
        echo json_encode(array("message" => "Unable to update cart item."));
    }
}
// Tell the user data is incomplete
else{
    // Set response code - 400 bad request
    http_response_code(400);

    // Tell the user
    echo json_encode(array("message" => "Unable to update cart item. Data is incomplete."));
}
?>
