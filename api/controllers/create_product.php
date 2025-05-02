<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database and product model
include_once '../config/database.php';
include_once '../models/product.php';
include_once '../models/inventory.php';

// Get database connection
$database = new Database();
$db = $database->getConnection();

// Instantiate product object
$product = new Product($db);

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Make sure data is not empty
if(
    !empty($data->product_name) &&
    !empty($data->product_desc) &&
    !empty($data->category) &&
    !empty($data->price) &&
    !empty($data->stock_quantity) &&
    !empty($data->seller_id)
){
    // Set product property values
    $product->product_name = $data->product_name;
    $product->product_desc = $data->product_desc;
    $product->category = $data->category;
    $product->price = $data->price;
    $product->stock_quantity = $data->stock_quantity;
    $product->seller_id = $data->seller_id;

    // Create the product
    if($product->create()){
        // Get the new product ID
        $product_id = $db->lastInsertId();

        // Create inventory record
        $inventory = new Inventory($db);
        $inventory->product_id = $product_id;
        $inventory->quantity = $data->stock_quantity;
        $inventory->create();

        // Set response code - 201 created
        http_response_code(201);

        // Tell the user
        echo json_encode(array(
            "message" => "Product was created.",
            "product_id" => $product_id
        ));
    }
    // If unable to create the product
    else{
        // Set response code - 503 service unavailable
        http_response_code(503);

        // Tell the user
        echo json_encode(array("message" => "Unable to create product."));
    }
}
// Tell the user data is incomplete
else{
    // Set response code - 400 bad request
    http_response_code(400);

    // Tell the user
    echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
}
?>
