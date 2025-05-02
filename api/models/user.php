<?php
class User {
    // Database connection and table name
    private $conn;
    private $table_name = "users_tb";

    // Object properties
    public $user_id;
    public $username;
    public $password;
    public $email_address;
    public $address;
    public $role;
    public $created_at;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Create user
    public function create() {
        // Query to insert record
        $query = "INSERT INTO " . $this->table_name . "
                  SET username=:username, password=:password, email_address=:email_address, 
                      address=:address, role=:role, created_at=:created_at";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->email_address = htmlspecialchars(strip_tags($this->email_address));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->role = htmlspecialchars(strip_tags($this->role));
        $this->created_at = date('Y-m-d H:i:s');

        // Hash the password
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);

        // Bind values
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":password", $password_hash);
        $stmt->bindParam(":email_address", $this->email_address);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":role", $this->role);
        $stmt->bindParam(":created_at", $this->created_at);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Login user
    public function login() {
        // Query to check if email exists
        $query = "SELECT user_id, username, password, role FROM " . $this->table_name . " 
                  WHERE email_address = ?";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->email_address = htmlspecialchars(strip_tags($this->email_address));

        // Bind value
        $stmt->bindParam(1, $this->email_address);

        // Execute query
        $stmt->execute();

        // Get row count
        $num = $stmt->rowCount();

        // If email exists, check password
        if($num > 0) {
            // Get record details
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verify password
            if(password_verify($this->password, $row['password'])) {
                // Set values to object properties
                $this->user_id = $row['user_id'];
                $this->username = $row['username'];
                $this->role = $row['role'];
                return true;
            }
        }

        return false;
    }

    // Check if email exists
    public function emailExists() {
        // Query to check if email exists
        $query = "SELECT user_id, username, password, role FROM " . $this->table_name . " 
                  WHERE email_address = ?";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->email_address = htmlspecialchars(strip_tags($this->email_address));

        // Bind value
        $stmt->bindParam(1, $this->email_address);

        // Execute query
        $stmt->execute();

        // Get row count
        $num = $stmt->rowCount();

        // If email exists
        if($num > 0) {
            return true;
        }

        return false;
    }
}
?>
