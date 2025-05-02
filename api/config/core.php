<?php
// Show error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Home page URL
$home_url = "http://localhost/week-6/api/";

// Set page headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
?>
