<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database and inventory model
include_once '../config/database.php';
include_once '../models/inventory.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Instantiate inventory object
$inventory = new Inventory($db);

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Make sure data is not empty
if(
    !empty($data->inventory_id) &&
    !empty($data->quantity)
){
    // Set inventory property values
    $inventory->inventory_id = $data->inventory_id;
    $inventory->quantity = $data->quantity;

    // Update inventory
    if($inventory->update()){
        // Set response code - 200 ok
        http_response_code(200);

        // Tell the user
        echo json_encode(array("message" => "Inventory was updated."));
    }
    // If unable to update inventory
    else{
        // Set response code - 503 service unavailable
        http_response_code(503);

        // Tell the user
        echo json_encode(array("message" => "Unable to update inventory."));
    }
}
// Tell the user data is incomplete
else{
    // Set response code - 400 bad request
    http_response_code(400);

    // Tell the user
    echo json_encode(array("message" => "Unable to update inventory. Data is incomplete."));
}
?>
