<?php
class Product {
    // Database connection and table name
    private $conn;
    private $table_name = "products_tb";

    // Object properties
    public $product_id;
    public $product_name;
    public $product_desc;
    public $category;
    public $price;
    public $stock_quantity;
    public $seller_id;
    public $created_at;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Read all products
    public function read() {
        // Query to select all products
        $query = "SELECT p.product_id, p.product_name, p.product_desc, p.category, 
                         p.price, p.stock_quantity, p.seller_id, p.created_at,
                         u.username as seller_name
                  FROM " . $this->table_name . " p
                  LEFT JOIN users_tb u ON p.seller_id = u.user_id
                  ORDER BY p.created_at DESC";

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Read single product
    public function readOne() {
        // Query to read single record
        $query = "SELECT p.product_id, p.product_name, p.product_desc, p.category, 
                         p.price, p.stock_quantity, p.seller_id, p.created_at,
                         u.username as seller_name
                  FROM " . $this->table_name . " p
                  LEFT JOIN users_tb u ON p.seller_id = u.user_id
                  WHERE p.product_id = ?
                  LIMIT 0,1";

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(1, $this->product_id);

        // Execute query
        $stmt->execute();

        // Get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set values to object properties
        if($row) {
            $this->product_id = $row['product_id'];
            $this->product_name = $row['product_name'];
            $this->product_desc = $row['product_desc'];
            $this->category = $row['category'];
            $this->price = $row['price'];
            $this->stock_quantity = $row['stock_quantity'];
            $this->seller_id = $row['seller_id'];
            $this->created_at = $row['created_at'];
            return true;
        }

        return false;
    }

    // Create product
    public function create() {
        // Query to insert record
        $query = "INSERT INTO " . $this->table_name . "
                  SET product_name=:product_name, product_desc=:product_desc, category=:category, 
                      price=:price, stock_quantity=:stock_quantity, seller_id=:seller_id, 
                      created_at=:created_at";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->product_name = htmlspecialchars(strip_tags($this->product_name));
        $this->product_desc = htmlspecialchars(strip_tags($this->product_desc));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->stock_quantity = htmlspecialchars(strip_tags($this->stock_quantity));
        $this->seller_id = htmlspecialchars(strip_tags($this->seller_id));
        $this->created_at = date('Y-m-d H:i:s');

        // Bind values
        $stmt->bindParam(":product_name", $this->product_name);
        $stmt->bindParam(":product_desc", $this->product_desc);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":stock_quantity", $this->stock_quantity);
        $stmt->bindParam(":seller_id", $this->seller_id);
        $stmt->bindParam(":created_at", $this->created_at);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Update product
    public function update() {
        // Query to update record
        $query = "UPDATE " . $this->table_name . "
                  SET product_name=:product_name, product_desc=:product_desc, category=:category, 
                      price=:price, stock_quantity=:stock_quantity
                  WHERE product_id=:product_id AND seller_id=:seller_id";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $this->product_name = htmlspecialchars(strip_tags($this->product_name));
        $this->product_desc = htmlspecialchars(strip_tags($this->product_desc));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->stock_quantity = htmlspecialchars(strip_tags($this->stock_quantity));
        $this->seller_id = htmlspecialchars(strip_tags($this->seller_id));

        // Bind values
        $stmt->bindParam(":product_id", $this->product_id);
        $stmt->bindParam(":product_name", $this->product_name);
        $stmt->bindParam(":product_desc", $this->product_desc);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":stock_quantity", $this->stock_quantity);
        $stmt->bindParam(":seller_id", $this->seller_id);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete product
    public function delete() {
        // Query to delete record
        $query = "DELETE FROM " . $this->table_name . " 
                  WHERE product_id = ? AND seller_id = ?";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $this->seller_id = htmlspecialchars(strip_tags($this->seller_id));

        // Bind values
        $stmt->bindParam(1, $this->product_id);
        $stmt->bindParam(2, $this->seller_id);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Get products by seller
    public function readBySeller() {
        // Query to select products by seller
        $query = "SELECT product_id, product_name, product_desc, category, 
                         price, stock_quantity, created_at
                  FROM " . $this->table_name . "
                  WHERE seller_id = ?
                  ORDER BY created_at DESC";

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind seller ID
        $stmt->bindParam(1, $this->seller_id);

        // Execute query
        $stmt->execute();

        return $stmt;
    }
}
?>
