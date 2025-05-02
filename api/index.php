<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// API information
$api_info = array(
    "name" => "E-Commerce API",
    "version" => "1.0.0",
    "description" => "API for Chronosphere E-Commerce Platform",
    "endpoints" => array(
        "Authentication" => array(
            "register" => "/api/controllers/register.php",
            "login" => "/api/controllers/login.php"
        ),
        "Products" => array(
            "read_all" => "/api/controllers/read_products.php",
            "create" => "/api/controllers/create_product.php",
            "read_by_seller" => "/api/controllers/read_seller_products.php?seller_id={id}"
        ),
        "Cart" => array(
            "read" => "/api/controllers/read_cart.php?user_id={id}",
            "add" => "/api/controllers/add_to_cart.php",
            "update" => "/api/controllers/update_cart.php",
            "remove" => "/api/controllers/remove_from_cart.php"
        ),
        "Orders" => array(
            "create" => "/api/controllers/create_order.php",
            "read_all" => "/api/controllers/read_orders.php?user_id={id}",
            "read_one" => "/api/controllers/read_order_details.php?order_id={id}&user_id={user_id}"
        ),
        "Inventory" => array(
            "read" => "/api/controllers/read_inventory.php?seller_id={id}",
            "update" => "/api/controllers/update_inventory.php"
        )
    )
);

// Set response code - 200 OK
http_response_code(200);

// Show API information
echo json_encode($api_info);
?>
