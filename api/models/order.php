<?php
class Order {
    // Database connection and table names
    private $conn;
    private $orders_table = "orders_tb";
    private $order_items_table = "order_items_tb";
    private $products_table = "products_tb";

    // Object properties
    public $order_id;
    public $user_id;
    public $order_date;
    public $total_amount;
    public $shipping_fee;
    public $order_status;
    public $shipping_address;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Create order
    public function create() {
        // Start transaction
        $this->conn->beginTransaction();

        try {
            // Insert order
            $query = "INSERT INTO " . $this->orders_table . "
                      SET user_id=:user_id, order_date=:order_date, total_amount=:total_amount,
                          shipping_fee=:shipping_fee, order_status=:order_status, 
                          shipping_address=:shipping_address";

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Sanitize
            $this->user_id = htmlspecialchars(strip_tags($this->user_id));
            $this->order_date = date('Y-m-d H:i:s');
            $this->total_amount = htmlspecialchars(strip_tags($this->total_amount));
            $this->shipping_fee = htmlspecialchars(strip_tags($this->shipping_fee));
            $this->order_status = htmlspecialchars(strip_tags($this->order_status));
            $this->shipping_address = htmlspecialchars(strip_tags($this->shipping_address));

            // Bind values
            $stmt->bindParam(":user_id", $this->user_id);
            $stmt->bindParam(":order_date", $this->order_date);
            $stmt->bindParam(":total_amount", $this->total_amount);
            $stmt->bindParam(":shipping_fee", $this->shipping_fee);
            $stmt->bindParam(":order_status", $this->order_status);
            $stmt->bindParam(":shipping_address", $this->shipping_address);

            // Execute query
            $stmt->execute();

            // Get the order ID
            $this->order_id = $this->conn->lastInsertId();

            // Commit transaction
            $this->conn->commit();

            return true;
        } catch (Exception $e) {
            // Rollback transaction on error
            $this->conn->rollBack();
            return false;
        }
    }

    // Add order item
    public function addOrderItem($product_id, $quantity, $price) {
        // Query to insert order item
        $query = "INSERT INTO " . $this->order_items_table . "
                  SET order_id=:order_id, product_id=:product_id, quantity=:quantity, price=:price";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $product_id = htmlspecialchars(strip_tags($product_id));
        $quantity = htmlspecialchars(strip_tags($quantity));
        $price = htmlspecialchars(strip_tags($price));

        // Bind values
        $stmt->bindParam(":order_id", $this->order_id);
        $stmt->bindParam(":product_id", $product_id);
        $stmt->bindParam(":quantity", $quantity);
        $stmt->bindParam(":price", $price);

        // Execute query
        if($stmt->execute()) {
            // Update product stock
            $update_query = "UPDATE " . $this->products_table . "
                            SET stock_quantity = stock_quantity - :quantity
                            WHERE product_id = :product_id";
            
            // Prepare query
            $update_stmt = $this->conn->prepare($update_query);
            
            // Bind values
            $update_stmt->bindParam(":quantity", $quantity);
            $update_stmt->bindParam(":product_id", $product_id);
            
            // Execute query
            $update_stmt->execute();
            
            return true;
        }

        return false;
    }

    // Get orders for a user
    public function readByUser() {
        // Query to get orders
        $query = "SELECT order_id, user_id, order_date, total_amount, shipping_fee, 
                         order_status, shipping_address
                  FROM " . $this->orders_table . "
                  WHERE user_id = ?
                  ORDER BY order_date DESC";

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind user ID
        $stmt->bindParam(1, $this->user_id);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Get order details
    public function readOne() {
        // Query to get order
        $query = "SELECT order_id, user_id, order_date, total_amount, shipping_fee, 
                         order_status, shipping_address
                  FROM " . $this->orders_table . "
                  WHERE order_id = ? AND user_id = ?
                  LIMIT 0,1";

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind IDs
        $stmt->bindParam(1, $this->order_id);
        $stmt->bindParam(2, $this->user_id);

        // Execute query
        $stmt->execute();

        // Get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set values to object properties
        if($row) {
            $this->order_id = $row['order_id'];
            $this->user_id = $row['user_id'];
            $this->order_date = $row['order_date'];
            $this->total_amount = $row['total_amount'];
            $this->shipping_fee = $row['shipping_fee'];
            $this->order_status = $row['order_status'];
            $this->shipping_address = $row['shipping_address'];
            return true;
        }

        return false;
    }

    // Get order items
    public function getOrderItems() {
        // Query to get order items with product details
        $query = "SELECT oi.order_item_id, oi.product_id, oi.quantity, oi.price,
                         p.product_name, p.product_desc
                  FROM " . $this->order_items_table . " oi
                  LEFT JOIN " . $this->products_table . " p ON oi.product_id = p.product_id
                  WHERE oi.order_id = ?";

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind order ID
        $stmt->bindParam(1, $this->order_id);

        // Execute query
        $stmt->execute();

        return $stmt;
    }
}
?>
