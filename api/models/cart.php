<?php
class Cart {
    // Database connection and table name
    private $conn;
    private $table_name = "cart_tb";

    // Object properties
    public $cart_id;
    public $user_id;
    public $product_id;
    public $quantity;
    public $added_at;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Get cart items for a user
    public function read() {
        // Query to get cart items with product details
        $query = "SELECT c.cart_id, c.user_id, c.product_id, c.quantity, c.added_at,
                         p.product_name, p.product_desc, p.price, p.stock_quantity,
                         (p.price * c.quantity) as total_price
                  FROM " . $this->table_name . " c
                  LEFT JOIN products_tb p ON c.product_id = p.product_id
                  WHERE c.user_id = ?
                  ORDER BY c.added_at DESC";

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind user ID
        $stmt->bindParam(1, $this->user_id);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Add item to cart
    public function create() {
        // Check if item already exists in cart
        $check_query = "SELECT cart_id, quantity FROM " . $this->table_name . "
                        WHERE user_id = ? AND product_id = ?";
        
        // Prepare statement
        $check_stmt = $this->conn->prepare($check_query);
        
        // Bind values
        $check_stmt->bindParam(1, $this->user_id);
        $check_stmt->bindParam(2, $this->product_id);
        
        // Execute query
        $check_stmt->execute();
        
        // If item exists, update quantity
        if($check_stmt->rowCount() > 0) {
            $row = $check_stmt->fetch(PDO::FETCH_ASSOC);
            $this->cart_id = $row['cart_id'];
            $new_quantity = $row['quantity'] + $this->quantity;
            
            // Update query
            $query = "UPDATE " . $this->table_name . "
                      SET quantity = :quantity
                      WHERE cart_id = :cart_id";
            
            // Prepare statement
            $stmt = $this->conn->prepare($query);
            
            // Bind values
            $stmt->bindParam(":quantity", $new_quantity);
            $stmt->bindParam(":cart_id", $this->cart_id);
            
            // Execute query
            if($stmt->execute()) {
                return true;
            }
            return false;
        }
        
        // If item doesn't exist, insert new item
        $query = "INSERT INTO " . $this->table_name . "
                  SET user_id=:user_id, product_id=:product_id, quantity=:quantity, added_at=:added_at";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $this->quantity = htmlspecialchars(strip_tags($this->quantity));
        $this->added_at = date('Y-m-d H:i:s');

        // Bind values
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":product_id", $this->product_id);
        $stmt->bindParam(":quantity", $this->quantity);
        $stmt->bindParam(":added_at", $this->added_at);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Update cart item quantity
    public function update() {
        // Query to update quantity
        $query = "UPDATE " . $this->table_name . "
                  SET quantity = :quantity
                  WHERE cart_id = :cart_id AND user_id = :user_id";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->cart_id = htmlspecialchars(strip_tags($this->cart_id));
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->quantity = htmlspecialchars(strip_tags($this->quantity));

        // Bind values
        $stmt->bindParam(":cart_id", $this->cart_id);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":quantity", $this->quantity);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Remove item from cart
    public function delete() {
        // Query to delete cart item
        $query = "DELETE FROM " . $this->table_name . "
                  WHERE cart_id = ? AND user_id = ?";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->cart_id = htmlspecialchars(strip_tags($this->cart_id));
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));

        // Bind values
        $stmt->bindParam(1, $this->cart_id);
        $stmt->bindParam(2, $this->user_id);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Clear cart
    public function clear() {
        // Query to delete all cart items for a user
        $query = "DELETE FROM " . $this->table_name . " WHERE user_id = ?";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));

        // Bind value
        $stmt->bindParam(1, $this->user_id);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
