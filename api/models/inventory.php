<?php
class Inventory {
    // Database connection and table name
    private $conn;
    private $table_name = "inventory_tb";

    // Object properties
    public $inventory_id;
    public $product_id;
    public $quantity;
    public $last_updated;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Read inventory for a product
    public function read() {
        // Query to get inventory
        $query = "SELECT i.inventory_id, i.product_id, i.quantity, i.last_updated,
                         p.product_name, p.category
                  FROM " . $this->table_name . " i
                  LEFT JOIN products_tb p ON i.product_id = p.product_id
                  WHERE i.product_id = ?
                  LIMIT 0,1";

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind product ID
        $stmt->bindParam(1, $this->product_id);

        // Execute query
        $stmt->execute();

        // Get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set values to object properties
        if($row) {
            $this->inventory_id = $row['inventory_id'];
            $this->product_id = $row['product_id'];
            $this->quantity = $row['quantity'];
            $this->last_updated = $row['last_updated'];
            return true;
        }

        return false;
    }

    // Create inventory
    public function create() {
        // Query to insert record
        $query = "INSERT INTO " . $this->table_name . "
                  SET product_id=:product_id, quantity=:quantity, last_updated=:last_updated";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $this->quantity = htmlspecialchars(strip_tags($this->quantity));
        $this->last_updated = date('Y-m-d H:i:s');

        // Bind values
        $stmt->bindParam(":product_id", $this->product_id);
        $stmt->bindParam(":quantity", $this->quantity);
        $stmt->bindParam(":last_updated", $this->last_updated);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Update inventory
    public function update() {
        // Query to update record
        $query = "UPDATE " . $this->table_name . "
                  SET quantity=:quantity, last_updated=:last_updated
                  WHERE inventory_id=:inventory_id";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->inventory_id = htmlspecialchars(strip_tags($this->inventory_id));
        $this->quantity = htmlspecialchars(strip_tags($this->quantity));
        $this->last_updated = date('Y-m-d H:i:s');

        // Bind values
        $stmt->bindParam(":inventory_id", $this->inventory_id);
        $stmt->bindParam(":quantity", $this->quantity);
        $stmt->bindParam(":last_updated", $this->last_updated);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Get inventory by seller
    public function readBySeller($seller_id) {
        // Query to get inventory for seller's products
        $query = "SELECT i.inventory_id, i.product_id, i.quantity, i.last_updated,
                         p.product_name, p.category, p.price
                  FROM " . $this->table_name . " i
                  LEFT JOIN products_tb p ON i.product_id = p.product_id
                  WHERE p.seller_id = ?
                  ORDER BY i.last_updated DESC";

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind seller ID
        $stmt->bindParam(1, $seller_id);

        // Execute query
        $stmt->execute();

        return $stmt;
    }
}
?>
