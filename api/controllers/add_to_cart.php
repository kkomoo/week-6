<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
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
    !empty($data->user_id) &&
    !empty($data->product_id) &&
    !empty($data->quantity)
){
    // Set cart property values
    $cart->user_id = $data->user_id;
    $cart->product_id = $data->product_id;
    $cart->quantity = $data->quantity;

    // Add to cart
    if($cart->create()){
        // Set response code - 201 created
        http_response_code(201);

        // Tell the user
        echo json_encode(array("message" => "Item added to cart."));
    }
    // If unable to add to cart
    else{
        // Set response code - 503 service unavailable
        http_response_code(503);

        // Tell the user
        echo json_encode(array("message" => "Unable to add item to cart."));
    }
}
// Tell the user data is incomplete
else{
    // Set response code - 400 bad request
    http_response_code(400);

    // Tell the user
    echo json_encode(array("message" => "Unable to add item to cart. Data is incomplete."));
}
?>
