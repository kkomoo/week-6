<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
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
    !empty($data->user_id)
){
    // Set cart property values
    $cart->cart_id = $data->cart_id;
    $cart->user_id = $data->user_id;

    // Remove from cart
    if($cart->delete()){
        // Set response code - 200 ok
        http_response_code(200);

        // Tell the user
        echo json_encode(array("message" => "Item was removed from cart."));
    }
    // If unable to remove from cart
    else{
        // Set response code - 503 service unavailable
        http_response_code(503);

        // Tell the user
        echo json_encode(array("message" => "Unable to remove item from cart."));
    }
}
// Tell the user data is incomplete
else{
    // Set response code - 400 bad request
    http_response_code(400);

    // Tell the user
    echo json_encode(array("message" => "Unable to remove item from cart. Data is incomplete."));
}
?>
